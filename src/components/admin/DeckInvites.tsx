"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, LinkSimple, Prohibit } from "@phosphor-icons/react";

interface Invite {
  id: number;
  name: string;
  email: string;
  organization: string | null;
  created_at: string;
  revoked_at: string | null;
  last_used_at: string | null;
  use_count: number;
}

const DECKS = [
  { value: "platform", label: "Platform" },
  { value: "rancho-cordova", label: "Rancho Cordova" },
  { value: "partners", label: "Partners page" },
];

/**
 * Create and manage the per-person links that unlock the partner decks.
 * The link is shown once, at creation: only its hash is stored, so it
 * cannot be recovered afterwards. Revoked links stop working immediately.
 */
export default function DeckInvites({ password }: { password: string }) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [deck, setDeck] = useState("platform");
  const [creating, setCreating] = useState(false);
  const [newLink, setNewLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const qs = `password=${encodeURIComponent(password)}`;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/deck-invites?${qs}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load");
      setInvites(data.invites || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
    setLoading(false);
  }, [qs]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setNewLink(null);
    try {
      const res = await fetch(`/api/admin/deck-invites?${qs}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, to: deck }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create");
      setNewLink(data.url);
      setName("");
      setEmail("");
      setOrganization("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    }
    setCreating(false);
  };

  const revoke = async (id: number, who: string) => {
    if (!confirm(`Revoke ${who}'s link? It stops working immediately.`)) return;
    try {
      const res = await fetch(`/api/admin/deck-invites?${qs}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to revoke");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke");
    }
  };

  const copy = async () => {
    if (!newLink) return;
    await navigator.clipboard.writeText(newLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <form onSubmit={create} className="border border-black/10 bg-white p-6">
        <h2 className="font-heading text-lg uppercase tracking-tight">
          New partner link
        </h2>
        <p className="mt-1 text-sm text-black/50">
          Creates a link for one person. Send it to them yourself. Every deck
          view opened with it is recorded against their name.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-cobalt"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-cobalt"
          />
          <input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Organization (optional)"
            className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-cobalt"
          />
          <select
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
            className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-cobalt"
          >
            {DECKS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={creating || !name || !email}
          className="mt-4 flex items-center gap-2 bg-true-black px-5 py-3 text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt disabled:opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <LinkSimple size={14} weight="bold" />
          {creating ? "Creating..." : "Create link"}
        </button>

        {newLink ? (
          <div className="mt-5 border border-cobalt/30 bg-cobalt/5 p-4">
            <p className="text-xs uppercase tracking-wider text-cobalt" style={{ fontFamily: "var(--font-mono)" }}>
              Copy this now. It is not shown again.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto whitespace-nowrap bg-white px-3 py-2 text-xs">
                {newLink}
              </code>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1.5 bg-cobalt px-3 py-2 text-xs text-off-white"
              >
                <Copy size={12} weight="bold" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-3 text-sm text-orange">{error}</p> : null}
      </form>

      <h2 className="mt-10 font-heading text-lg uppercase tracking-tight">
        Who has access
      </h2>
      {loading ? (
        <p className="mt-4 text-sm text-black/50">Loading...</p>
      ) : invites.length === 0 ? (
        <p className="mt-4 text-sm text-black/50">No links yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wider text-black/40">
                <th className="py-2 pr-4 font-normal">Person</th>
                <th className="py-2 pr-4 font-normal">Organization</th>
                <th className="py-2 pr-4 font-normal">Opens</th>
                <th className="py-2 pr-4 font-normal">Last opened</th>
                <th className="py-2 pr-4 font-normal">Status</th>
                <th className="py-2 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {invites.map((i) => (
                <tr key={i.id} className="border-b border-black/5">
                  <td className="py-3 pr-4">
                    <span className="block">{i.name}</span>
                    <span className="block text-xs text-black/40">{i.email}</span>
                  </td>
                  <td className="py-3 pr-4 text-black/60">{i.organization || "—"}</td>
                  <td className="py-3 pr-4">{i.use_count}</td>
                  <td className="py-3 pr-4 text-black/60">{fmt(i.last_used_at)}</td>
                  <td className="py-3 pr-4">
                    {i.revoked_at ? (
                      <span className="text-orange">Revoked</span>
                    ) : (
                      <span className="text-black/60">Active</span>
                    )}
                  </td>
                  <td className="py-3">
                    {i.revoked_at ? null : (
                      <button
                        onClick={() => revoke(i.id, i.name)}
                        className="flex items-center gap-1 text-xs text-black/40 transition-colors hover:text-orange"
                      >
                        <Prohibit size={12} weight="bold" />
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

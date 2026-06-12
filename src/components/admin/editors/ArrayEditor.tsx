"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  Trash,
  ArrowUp,
  ArrowDown,
  Plus,
  UploadSimple,
} from "@phosphor-icons/react";

/**
 * Text input for an image URL plus an Upload button that sends the
 * file to /api/admin/upload (Vercel Blob) and fills the URL in.
 */
function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(`uploads/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        clientPayload: sessionStorage.getItem("bcc-admin-pw") || "",
      });
      onChange(blob.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (/content.?type/i.test(message)) {
        setError("That file type isn't supported — use a JPG, PNG, WebP, or GIF");
      } else if (/size/i.test(message)) {
        setError("Image is too large — keep it under 20MB");
      } else {
        setError(message || "Upload failed");
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Upload an image or paste a URL"
          className="flex-1 bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-cobalt border border-cobalt/30 rounded-md hover:bg-cobalt/5 transition-colors disabled:opacity-50 whitespace-nowrap"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <UploadSimple size={14} weight="bold" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && (
        <p
          className="text-[#D32F2F] text-xs"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {error}
        </p>
      )}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-20 w-32 object-cover rounded-md border border-black/10"
        />
      )}
    </div>
  );
}

interface ArrayEditorStringProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
}

export function ArrayEditorString({
  label,
  items,
  onChange,
  addLabel = "Add Item",
}: ArrayEditorStringProps) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
            />
            <button
              type="button"
              onClick={() => moveUp(i)}
              className="p-1.5 text-black/30 hover:text-black/60 transition-colors"
              title="Move up"
            >
              <ArrowUp size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => moveDown(i)}
              className="p-1.5 text-black/30 hover:text-black/60 transition-colors"
              title="Move down"
            >
              <ArrowDown size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1.5 text-black/30 hover:text-[#D32F2F] transition-colors"
              title="Remove"
            >
              <Trash size={14} weight="bold" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-cobalt hover:text-cobalt/70 transition-colors mt-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Plus size={12} weight="bold" />
        {addLabel}
      </button>
    </div>
  );
}

interface ArrayEditorObjectProps {
  label: string;
  items: Record<string, string>[];
  fields: { key: string; label: string; multiline?: boolean; image?: boolean }[];
  onChange: (items: Record<string, string>[]) => void;
  addLabel?: string;
}

export function ArrayEditorObject({
  label,
  items,
  fields,
  onChange,
  addLabel = "Add Item",
}: ArrayEditorObjectProps) {
  const updateField = (
    index: number,
    fieldKey: string,
    value: string
  ) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [fieldKey]: value } : item
    );
    onChange(next);
  };
  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };
  const add = () => {
    const blank: Record<string, string> = {};
    for (const f of fields) blank[f.key] = "";
    onChange([...items, blank]);
  };

  return (
    <div className="space-y-2">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-black/[0.02] rounded-md border border-black/5 p-3 space-y-2"
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] uppercase tracking-wider text-black/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Item {i + 1}
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => moveUp(i)}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <ArrowUp size={12} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(i)}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <ArrowDown size={12} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1 text-black/30 hover:text-[#D32F2F] transition-colors"
              >
                <Trash size={12} weight="bold" />
              </button>
            </div>
          </div>
          {fields.map((field) => (
            <div key={field.key} className="space-y-1">
              <label
                className="block text-[10px] uppercase tracking-wider text-black/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {field.label}
              </label>
              {field.image ? (
                <ImageInput
                  value={item[field.key] || ""}
                  onChange={(v) => updateField(i, field.key, v)}
                />
              ) : field.multiline ? (
                <textarea
                  value={item[field.key] || ""}
                  onChange={(e) =>
                    updateField(i, field.key, e.target.value)
                  }
                  rows={3}
                  className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={item[field.key] || ""}
                  onChange={(e) =>
                    updateField(i, field.key, e.target.value)
                  }
                  className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-cobalt hover:text-cobalt/70 transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Plus size={12} weight="bold" />
        {addLabel}
      </button>
    </div>
  );
}

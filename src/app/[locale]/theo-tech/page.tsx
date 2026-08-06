/**
 * Public viewer for the Theo x Tech keynote. The deck is a self-contained
 * HTML file under /keynote/, which the middleware does not gate: this is a
 * conference talk, so anyone handed the link or scanning from the room has
 * to be able to open it without a password.
 */
export default function TheoTechKeynote() {
  return (
    <div className="flex h-screen flex-col bg-true-black">
      <iframe
        src="/keynote/theo-tech.html"
        title="Black Girls CODE x Beyond Code Collective — Who gets to build, and how communities lead"
        className="h-full w-full flex-1 border-0"
      />
    </div>
  );
}

// Kildehenvisning, f.eks. <Ref n={3} /> → [3] med lenke til kildelista
export default function Ref({ n }: { n: number }) {
  return (
    <a href={`#ref${n}`} className="align-super text-[0.7em] font-medium text-blue-500 hover:underline">
      [{n}]
    </a>
  );
}

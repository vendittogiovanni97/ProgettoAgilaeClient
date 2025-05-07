import OrgChart from "@/TestDiagramma/OrgChart";

const data = [
  { id: 1, name: "CEO", title: "Direttore Generale", parentId: null },
  { id: 2, name: "CTO", title: "Direttore Tecnico", parentId: 1 },
  { id: 3, name: "CFO", title: "Direttore Finanziario", parentId: 1 },
  { id: 4, name: "Dev1", title: "Sviluppatore", parentId: 2 },
  { id: 5, name: "Dev2", title: "Sviluppatore", parentId: 2 },
  { id: 6, name: "Contabile", title: "Contabilità", parentId: 3 },
];

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Organigramma Aziendale</h1>
      <OrgChart data={data} />
    </main>
  );
}

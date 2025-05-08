"use client";

import React, { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";

type Person = {
  id: number;
  name: string;
  title: string;
  parentId: number | null;
};

type OrgChartProps = {
  data: Person[];
};

const getColorByTitle = (title: string): string => {
  switch (title) {
    case "Direttore Generale":
      return "#007BFF"; // blu
    case "Direttore Tecnico":
      return "#28A745"; // verde
    case "Direttore Finanziario":
      return "#FFC107"; // giallo
    case "Sviluppatore":
      return "#17A2B8"; // azzurro
    case "Contabilità":
      return "#E83E8C"; // rosa
    default:
      return "#6C757D"; // grigio
  }
};

const OrgChartComponent: React.FC<OrgChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new OrgChart()
      .container("#chart-container")
      .data(
        data
      ) /* Assegna i dati dell'organigramma. 'data' è l'array che contiene le informazioni sui nodi (persone e relazioni gerarchiche).
       Ogni oggetto all'interno di 'data' rappresenta una persona, con informazioni come id, nome, titolo e parentId. */
      .nodeHeight(
        () => 120
      ) /* Imposta l'altezza di ciascun nodo (persona) dell'organigramma a 120px.
       Puoi personalizzare questa altezza in base alle tue esigenze. In questo caso, il nodo avrà un'altezza fissa di 120px. */

      .nodeWidth(() => 220) /* imposta la larghezza fissa a 220 */

      .childrenMargin(() => 40)
      // Definisce la distanza tra un nodo e i suoi figli (in questo caso, 40px).
      // Questo parametro controlla quanto sono separati i nodi gerarchici a livello di bambini (nodi figli)

      .compactMarginBetween(() => 15) // Imposta la distanza tra i nodi all'interno di una coppia di nodi (in questo caso, 15px).
      // Questo valore definisce lo spazio tra i nodi che sono sullo stesso livello gerarchico.

      .compactMarginPair(() => 80)
      // Definisce la distanza verticale tra coppie di nodi (ad esempio, nodi che hanno una relazione diretta tra di loro, come supervisore e dipendente).
      // In questo caso, c'è uno spazio di 80px tra coppie di nodi.

      .nodeContent((d: any) => {
        // Personalizza il contenuto che appare all'interno di ogni nodo dell'organigramma.
        // 'd' rappresenta il dato associato al nodo corrente. 'd.data' contiene le informazioni dell'individuo, come nome, titolo, ecc.
        const bgColor = getColorByTitle(d.data.title);
        return `
          <div style="padding: 15px; background: ${bgColor}; color: white; border-radius: 10px; box-shadow: 2px 2px 5px #ccc;">
            <a href="${d.data.fileUrl}" target="_blank" style="text-decoration: none; color: #333;">
              <div style="font-weight: bold; font-size: 18px;">${d.data.name}</div><br/>
              <span style="font-size: 14px;">${d.data.title}</span>
            </a>
          </div>
        `;
      })
      .render();

    return () => {
      chartRef.current!.innerHTML = "";
    };
  }, [data]);

  return (
    <>
      <button onClick={() => window.print()}>Stampa / Salva come PDF</button>
      <div id="chart-container" ref={chartRef}></div>
    </>
  );
};

export default OrgChartComponent;

/**
 * Libreria: d3-org-chart
 *
 * Cos'è:
 * - d3-org-chart è una libreria open-source basata su D3.js progettata specificamente per creare organigrammi interattivi.
 * - Supporta visualizzazioni gerarchiche con layout a piramide (top-down), ideali per rappresentare strutture aziendali.
 *
 * Perché usarla:
 * - Si integra facilmente in progetti React e Next.js.
 * - Permette la personalizzazione completa dei nodi HTML tramite funzioni `nodeContent`.
 * - Gestisce layout dinamici, animazioni e ridimensionamento automatico.
 * - È pensata proprio per organigrammi, quindi evita la complessità del D3 nativo.
 *
 * Vantaggi:
 * ✔️ Layout a piramide già pronto e interattivo.
 * ✔️ Personalizzazione visiva completa (colori, HTML, immagini).
 * ✔️ Supporto per dati a struttura piatta (con `id` e `parentId`).
 * ✔️ Buona documentazione e manutenzione attiva.
 * ✔️ Open-source (MIT).
 *
 * Svantaggi:
 * ❌ Non è una libreria React nativa: richiede l’uso diretto di DOM e `useEffect`.
 * ❌ Non gestisce automaticamente lo stile responsive: va fatto a mano.
 * ❌ Layout limitato a struttura gerarchica verticale (non c’è supporto per layout a matrice o reticoli).
 * ❌ Nessun supporto integrato per drag & drop o modifiche in tempo reale dei dati.
 *
 * Compatibilità con Material-UI:
 * - ✅ È compatibile a livello di progetto: puoi usarla insieme a Material-UI.
 * - ⚠️ Tuttavia, i nodi sono generati come HTML puro (stringhe), quindi NON puoi usare direttamente componenti React/Material-UI all'interno dei nodi.
 * - Soluzione: puoi copiare lo stile dei componenti MUI nei nodi manualmente con CSS inline oppure usare il `sx` degli stili MUI come ispirazione.
 *
 * Esempio uso compatibile:
 * - Posizionare l’organigramma dentro un container MUI (`Box`, `Paper`, ecc.)
 * - Integrare i colori e gli spazi coerenti con il tuo tema MUI.
 *
 * In sintesi:
 * 🔹 Ottima scelta per visualizzare organigrammi gerarchici.
 * 🔹 Si usa bene insieme a Material-UI, ma va trattata come una "bolla" DOM separata.
 * 
 * 
 * 
🎯 Obiettivo:
Mostrare la struttura dell’azienda in modo chiaro, interattivo e riutilizzabile (sia web che cartaceo).

✅ Cosa offre il sistema:
📊 Organigramma gerarchico visivo (a piramide).

🔗 Ogni persona è cliccabile: puoi collegare il suo CV, profilo o file utile.

🖨️ Possibilità di stampare o salvare in PDF l'intero schema.

🎨 Design coerente con la UI aziendale se usi Material-UI.

📁 Dati JSON gestibili dinamicamente dal backend o da un file statico.

🔧 Tecnologie usate:
d3-org-chart: libreria open-source per la visualizzazione gerarchica.

Next.js: rendering ottimizzato e scalabilità.

(Opzionale) html2canvas + jsPDF per il salvataggio PDF.
 */

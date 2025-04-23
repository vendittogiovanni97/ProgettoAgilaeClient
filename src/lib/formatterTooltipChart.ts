import { datiAutonoleggio } from "@/types/valoriGraficiEcharts";

// Funzione esterna per formattare il tooltip
export function formatTooltip(params: any) {
  return `${params.seriesName}<br/>
          <b>${params.name}</b>: ${params.value} (${params.percent}%)<br/>
          ${
            params.data.description ? `<i>${params.data.description}</i>` : ""
          }`;
}

export function tooltipBar(params: any) {
  const dataIndex = params[0].dataIndex;
  const item = datiAutonoleggio[dataIndex];
  return `<b>${item.nome}</b><br/>
          Valore: ${item.valore}<br/>
          Variazione: ${item.percentuale > 0 ? "+" : ""}${
    item.percentuale
  }%<br/>
          ${item.description}`;
}

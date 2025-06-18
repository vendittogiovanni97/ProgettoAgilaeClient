"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Box, CircularProgress, IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { ErrorResponse } from "@/module/common/interfaces/Common";
import { useThemeContext } from "@/module/common/providers/ThemeProvider";

interface ChartProps {
  option: Record<string, any>; // Qualsiasi configurazione ECharts
  sx?: SxProps<Theme>;
  size?: any;  // Dimensione del componente xs, sm, md, lg, xl
  ml?: number | string; // Margin left, utile per layout dinamico
  loadingKey?: string;  // Chiave per indicare il loading specifico in context
  height?: number | string;
  width?: number | string;
  showError?: boolean;  // Mostrare o meno l'errore
  showLoading?: boolean;
  onEvents?: Record<string, (params: any) => void>;   // Supporto a onEvents per gestire eventi ECharts come click, hover, ecc
  renderer?: 'canvas' | 'svg' // Motore di rendering del grafico
  title?: string | { text: string; subtext?: string; left?: string; top?: string; [key: string]: any };
  legend?: false | Record<string, any>; // false per disattivarla, altrimenti oggetto configurazione ECharts
  tooltip?: false | Record<string, any>;  // false per disattivarla, altrimenti oggetto configurazione ECharts
  notAvailableText?: string;  // Testo da mostrare quando il grafico non è disponibile
  enableExport?: boolean;  // Mostra il menu per esportazione PDF/immagini
  enableTimeFilter?: boolean; // Mostra il filtro temporale (di default false)
  defaultTimeFilter?: "day" | "week" | "month" | "year"; // Valore iniziale
  onTimeFilterChange?: (value: "day" | "week" | "month" | "year") => void; // Callback in uscita per il filtro temporale
  onChange?: () => void;
}

const Chart: React.FC<ChartProps> = ({
  option,
  sx,
  ml,
  height,
  width = "100%",
  loadingKey = "AgilaeChart.loading",
  showError = true,
  showLoading = true,
  onEvents, 
  renderer = "canvas",
  title,
  legend,
  tooltip,
  notAvailableText,
  defaultTimeFilter,
  onTimeFilterChange,
  enableTimeFilter,


}) => {
  const { setApiError, setLoading } = useThemeContext();
  const [internalError, setInternalError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const chartRef = useRef<ReactECharts | null>(null);  // Ref per interagire con ECharts direttamente
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month" | "year">(defaultTimeFilter || "month");

  useEffect(() => {
  if (option) {
    setIsLoading(false);
  }
}, [option]);

  // Combina le props title, legend, tooltip con la configurazione base
  const mergedOption = {
  ...option,
  title: typeof title === "string"
    ? { text: title, left: "center", top: 10 } // Se stringa: title centrato
    : title || option.title, // priorità alla prop `title` se esiste
    legend: legend === false ? undefined : legend || option.legend,
    tooltip: tooltip === false ? undefined : tooltip || option.tooltip,
};

  if (showLoading && isLoading) return <CircularProgress />;
  if (showError && internalError) return <Typography color="error">Errore</Typography>;
  if (option?.series?.length === 0) return <Typography>{notAvailableText || "Nessun dato disponibile"}</Typography>;

  return (
    <Fragment>
    {enableTimeFilter && (
      <Box display="flex" justifyContent="flex-start" mb={2}>
      <ToggleButtonGroup
        value={timeFilter}
        exclusive
        onChange={(_ : any, value : any) => {
          if (value !== null) {
            setTimeFilter(value);
            onTimeFilterChange?.(value);
          }
        }}
        size="small"
      >
        <ToggleButton value="day">Giorno</ToggleButton>
        <ToggleButton value="week">Settimana</ToggleButton>
        <ToggleButton value="month">Mese</ToggleButton>
        <ToggleButton value="year">Anno</ToggleButton>
      </ToggleButtonGroup>
      </Box>
      )}

      <Box sx={{ width, height, ...sx, ml }}>
        <ReactECharts option={mergedOption} opts={{ renderer }} onEvents={onEvents} ref={chartRef} notMerge={true} />
        {/*Opzione base per il rendering, migliora la dinamicità del grafico quando utilizza aggiornamenti frequenti */}
      </Box>
    </Fragment>
  );
};
export default Chart;

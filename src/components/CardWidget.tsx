'use client'
import AgilaeLink from "@/module/common/components/AgilaeLink";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

type CardWidgetProps = {
  label?: string;
  count?: number;
  icon?: ReactNode;
  onClick?: () => void;
  renderAction?: React.ReactNode
  href?: string
};

const CardWidget: React.FC<CardWidgetProps> = ( params ) => {
  const { label, count, icon, onClick, renderAction, href } = params;
  const theme = useTheme();

  const Wrapper = ({ children }: { children: ReactNode }) => {
  if (href) {
    return (
      <AgilaeLink href={href} style={{ textDecoration: "none" }} onClick={(e: any) => e.stopPropagation()}>
        <Box
          sx={{
            cursor: "pointer",
          }}
        >
          {children}
        </Box>
      </AgilaeLink>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </Box>
  );
};
  return (
    <Box  
        sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#d2d6d4",
        borderRadius: 10,
        border: '1px solid #808080',
        borderColor: "#808080",
        px: 2,
        py: 1.2,
        mb: 0.20,
      }}
      >  

      {/* Icona + Label */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
         <Box
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "#8a8a8a",
            borderRadius: "20px",
            clipPath: "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%, 10% 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        {/* Label */}
        <Wrapper>
          <Typography variant="h6" fontFamily={'Roboto'} sx={{color: "#1e1d4f", textShadow: "0 0 1px rgba(0,0,0,0.3)", textTransform: "capitalize", letterSpacing: 3}}
          >
            {label}
          </Typography>
        </Wrapper>
      </Box>

      {/* Contatore */}
      {typeof count === "number" && (
        <Avatar
          sx={{
            bgcolor: "#000000",
            color: "white",
            width: 25,
            height: 25,
            fontSize: "0.6rem",
            fontWeight: 600,
            ml: 0.5,
          }}
        >
          {count}
        </Avatar>
      )}
    </Box>
  )
}

export default CardWidget
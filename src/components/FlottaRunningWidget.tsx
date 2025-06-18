'use client'

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { AccessTime, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const runningData = [
  { id:1,  name: "Giacomo Raspandori", days: 180, color: "green" },
  { id:2, name: "Giorgio Armadi", days: 90, color: "blue" },
  { id:3, name: "Gianfranco Ferrètti", days: 30, color: "red" },
  { id:4, name: "Daria Nicoladi", days: 90, color: "blue" },
  { id:5, name: "Mario Rossi", days: 180, color: "green" },
  { id:6, name: "Elena Bianchi", days: 90, color: "blue" },
  { id:7, name: "Franco Neri", days: 30, color: "red" },
   { id:8, name: "Mario Rossi", days: 180, color: "green" },
  { id:9, name: "Elena Bianchi", days: 90, color: "blue" },
  { id:10, name: "Franco Neri", days: 30, color: "red" },
   {id:11, name: "Mario Rossi", days: 180, color: "green" },
  {id:12, name: "Elena Bianchi", days: 90, color: "blue" },
  { id:13, name: "Franco Neri", days: 30, color: "red" },
];

export default function FlottaRunningWidget() {
  const listRef = useRef<HTMLDivElement>(null);
    const [thumbTop, setThumbTop] = useState(0);
    const [thumbHeight, setThumbHeight] = useState(30); // iniziale
    const trackRef = useRef<HTMLDivElement>(null);


   const scroll = (direction: "up" | "down") => {
    const container = listRef.current;
    if (container) {
      container.scrollBy({
        top: direction === "up" ? -60 : 60,
        behavior: "smooth",
      });
    }
  };

const handleScroll = () => {
  const container = listRef.current;
  const track = trackRef.current;

  if (!container || !track) return;

  const { scrollTop, scrollHeight, clientHeight } = container;
  const trackHeight = track.clientHeight;

  // Calcolo proporzionale della thumb
  const newThumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 20);
  setThumbHeight(newThumbHeight);

  const scrollableHeight = scrollHeight - clientHeight;
  const maxThumbTop = trackHeight - newThumbHeight;

  const percentage = scrollTop / scrollableHeight;
  const newThumbTop = percentage * maxThumbTop;

  setThumbTop(newThumbTop);
};

    useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    handleScroll();

    // Cleanup
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Box
      width={300}
      height={315}
      borderRadius={4}
      boxShadow={3}
      bgcolor="#d2d6d4"
      p={2}
      pt={2}
      paddingLeft={5}
      position="relative"
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "bold", fontSize: 19, color: "#1e1d4f" }}
        gutterBottom
      >
        Flotta Running
      </Typography>

     {/* Scroll + scrollbar + frecce */}
      <Box display="flex" height={200}>
        {/* Lista scrollabile */}
        <Box
          ref={listRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
            pt: 1,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >

      <Stack spacing={2}>
        {runningData.map((item) => (
          <Box
            key={item.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            paddingTop={1}
            bgcolor="#C0C0C0"
          >
            <Box >
              <Typography
                sx={{fontSize: 14, color: "#1e1d4f", fontFamily:'Roboto' }}
              >
                {item.name} 
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: '#666', 
                width: 35,
                height: 35,
                borderRadius: 1,
                border: "2px solid #888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: -2, // Sposta l'icona più in alto
                mr: -1,  // Sposta l'icona un po' più a destra
              }}
            >
              <AccessTime sx={{ color: item.color,  }} />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>

    {/* Colonna laterale con scrollbar personalizzata e frecce */}
        <Box
          width={20}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            onClick={() => scroll("up")}
            sx={{
              bgcolor: "#d2d6d4",
              border: "1px solid #A9A9A9",
              borderRadius: 3,
              p: 0.3,
              width: 20,
              height: 20,
              ml: 2.5,
            }}
          >
            <KeyboardArrowUp sx={{ fontSize: 16 }} />
          </IconButton>

             {/* Track */}
          <Box
              ref={trackRef}
              height={150} // opzionale, puoi rimuovere se vuoi dinamico
              width={6}
              bgcolor="#bbb"
              borderRadius={5}
              position="relative"
              my={0.5}
              ml={2.5}
            >

            <Box
              sx={{
                position: "absolute",
                width: 6,
                height: `${thumbHeight}px`,
                bgcolor: "#696969",
                borderRadius: 5,
                top: `${thumbTop}px`,
                transition: "top 0.1s linear, height 0.1s linear",
              }}
            />
          </Box>

          <IconButton
            onClick={() => scroll("down")}
            sx={{
              bgcolor: "#d2d6d4",
              borderRadius: 3,
              border: "1px solid #A9A9A9",
              p: 0.3,
              width: 20,
              height: 20,
              ml: 2.5,
            }}
          >
            <KeyboardArrowDown sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>


      {/* Legenda */}
      <Box mt={1} mx={3} py={1} ml={-0.5} height={30} display="flex" justifyContent="space-around" borderRadius={5} bgcolor="#C0C0C0">
        <Box display="flex" alignItems="center">
          <AccessTime sx={{ color: "green", fontSize: 30, mr: 0.5 }} />
          <Typography color="black" fontSize={9}>180 gg</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <AccessTime sx={{ color: "blue", fontSize: 30, mr: 0.5 }} />
          <Typography color="black" fontSize={9}>90 gg</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <AccessTime sx={{ color: "red", fontSize: 30, mr: 0.5 }} />
          <Typography color="black" fontSize={9}>30 gg</Typography>
        </Box>
      </Box>
    </Box>
  );
}

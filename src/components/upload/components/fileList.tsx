"use client";

import { useFileContext } from "@/context/FileContext";
import { Box, Button, List, Pagination } from "@mui/material";
import { FileItem } from "./fileItem";
import { useState } from "react";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

export function FileList() {
  const { files } = useFileContext();
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFiles = files.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(files.length / itemsPerPage);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Button
        startIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={() => setOpen(!open)}
        sx={{ mb: 2, ml: 50 }}
      >
        {open ? "Nascondi file" : "Mostra file"}
      </Button>

      {open && (
        <>
          <List dense>
            {currentFiles.map((file, index) => (
              <FileItem key={index} file={file} />
            ))}
          </List>

          {/* Pagina numerata */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
}

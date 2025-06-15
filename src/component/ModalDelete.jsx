"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

export default function ModalDelete({ handelDelete, closeModal, open = true }) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle id="delete-dialog-title">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "error.light",
              color: "error.main",
              width: 40,
              height: 40,
            }}
          >
            <WarningIcon />
          </Avatar>
          <Box>Delete Post</Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={closeModal}
          variant="outlined"
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handelDelete}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Agriculture } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { KlassifikatorData } from "../../../../types/agriculture.interface";
import YearMenu from "../../../../components/common/YearMenu/YearMenu";

interface Props {
  placement: KlassifikatorData[];
  //   year: number;
}

function PlantedAreaModal({ placement = [] }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const normalizedPlacement = placement.map((item) => ({
    ...item,
    values: Object.fromEntries(
      Object.entries(item.values || {}).map(([k, v]) => [Number(k), v])
    ),
  }));

  const years = normalizedPlacement.length
    ? Object.keys(normalizedPlacement[0].values || {})
        .map(Number)
        .sort((a, b) => b - a)
    : [];

  useEffect(() => {
    if (years.length > 0) {
      setYear(Math.max(...years)); // eng oxirgi yil default
    }
  }, []);

  return (
    <>
      <Button
        variant="text"
        sx={{
          alignSelf: "end",
          fontWeight: "bold",
          color: "primary.main",
        }}
        onClick={() => handleOpen()}
      >
        Барчасини кўриш →
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <DialogTitle>
          Показатели
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <YearMenu
            selectedYear={year}
            onChange={setYear}
            years={years}
            className="!text-xl !ml-6"
            color={theme.palette.primary.main}
          />
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer className="mt-4 min-h-80">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Майдон</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Экилди</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ҳосил</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Фоизда</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {normalizedPlacement?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography className="flex items-center gap-2 font-medium">
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <Agriculture fontSize="small" />
                        </Avatar>
                        {item.metadata}
                      </Typography>
                    </TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>
                      {item.values[year] ? `${item.values[year]} т` : "-"}
                    </TableCell>
                    <TableCell>0%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlantedAreaModal;

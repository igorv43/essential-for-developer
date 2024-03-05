import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useEffect, useContext } from "react";
import { MMFixPrice as fixMMOBJ, MarketCoinModel } from "./Bussines/MMFixPrice";
import {
  MMFixPriceContextType,
  context,
} from "../src/Context/MMFixPriceContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
// const marketCapitalization = 239800348; //$239,800,348 USD
//     const totalSupply = 8969386191; //8,969,386,191 USTC

const selectFunctionRows = (values: string) => {
  let data = {
    marketCapitalization: 0,
    totalSupply: 0,
    data: [] as any,
  } as any;
  switch (values) {
    case "A":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8869386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.02727,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.02701,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.02678,
            volume: 40000000,
          },
        ],
      };
      break;
    case "B":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8869386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.02727,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.057,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.032,
            volume: 40000000,
          },
        ],
      };

      break;
    case "C":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8969386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.0281,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.0271,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.029,
            volume: 40000000,
          },
        ],
      };
      break;
    case "D":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8869386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.02701,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.017,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.01,
            volume: 40000000,
          },
        ],
      };
      break;
    case "E":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8869386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.012,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.017,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.01,
            volume: 40000000,
          },
        ],
      };
      break;
    case "F":
      data = {
        marketCapitalization: 239800348,
        totalSupply: 8869386191,
        data: [
          {
            id: randomId(),
            exchange: "Binance",
            pair: "USTC/USDT",
            price: 0.0481,
            volume: 70000000,
          },
          {
            id: randomId(),
            exchange: "Kucoin",
            pair: "USTC/USDT",
            price: 0.0671,
            volume: 20000000,
          },
          {
            id: randomId(),
            exchange: "Mexc",
            pair: "USTC/USDT",
            price: 0.0189,
            volume: 40000000,
          },
        ],
      };
      break;
    case "coingecko":
      break;
    default:
    // code block
  }

  return data;
};
const initialRows: GridRowsProp = selectFunctionRows("A").data as GridRowsProp;
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, exchange: "", pair: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "exchange" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix=""
      />
    );
  }
);
const NumericFormatCustomPrefix = React.forwardRef<
  NumericFormatProps,
  CustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});
export default function MarketList() {
  const [rows, setRows] = React.useState(initialRows);
  // const [fixPrice, setFixPrice] = React.useState({} as MMFixPriceModel);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { fixObj, updatePrice } = useContext(context) as MMFixPriceContextType;

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "exchange", headerName: "Exchange", width: 180, editable: true },
    {
      field: "pair",
      headerName: "Pair",

      width: 100,

      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 180,
      editable: true,
    },
    {
      field: "volume",
      headerName: "24h Volume",
      width: 220,
      editable: true,
      type: "number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const obj = selectFunctionRows("A");
  const [valuesMarket, setValuesMarket] = React.useState<MarketCoinModel>({
    marketCapitalization: obj.marketCapitalization,
    totalSupply: obj.totalSupply,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesMarket({
      ...valuesMarket,
      [event.target.name]: event.target.value,
    });
  };
  const [selectFunction, setSelectFunction] = React.useState("A");

  const SelectFunctionHandleChange = (event: SelectChangeEvent) => {
    setSelectFunction(event.target.value);
    const obj = selectFunctionRows(event.target.value);
    setValuesMarket({
      marketCapitalization: obj.marketCapitalization,
      totalSupply: obj.totalSupply,
    });
    setRows(obj.data);
  };
  useEffect(() => {
    updatePrice(fixMMOBJ.Calculate(rows, valuesMarket));
  }, [rows, valuesMarket]);

  return (
    <Box
      sx={{
        height: 700,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="pre-determined-values-label">
            Pre-determined values
          </InputLabel>
          <Select
            labelId="pre-determined-values-label"
            id="pre-determined-values"
            value={selectFunction}
            onChange={SelectFunctionHandleChange}
            label="Function A"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"A"}>Function A</MenuItem>
            <MenuItem value={"B"}>Function B</MenuItem>
            <MenuItem value={"C"}>Function C</MenuItem>
            <MenuItem value={"D"}>Function D</MenuItem>
            <MenuItem value={"E"}>Function E</MenuItem>
            <MenuItem value={"F"}>Function F</MenuItem>
            <MenuItem value={"coingecko"}>Coingecko</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Supply"
          value={valuesMarket.totalSupply}
          onChange={handleChange}
          name="totalSupply"
          id="formatted-totalSupply-input"
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          variant="standard"
        />
        <TextField
          label="Market"
          value={valuesMarket.marketCapitalization}
          onChange={handleChange}
          name="marketCapitalization"
          id="formatted-marketCapitalization-input"
          InputProps={{
            inputComponent: NumericFormatCustomPrefix as any,
          }}
          variant="standard"
        />
      </Stack>
      <br></br>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

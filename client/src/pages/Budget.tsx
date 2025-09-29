import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Receipt as ReceiptIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

interface BudgetItem {
  id: string;
  category: string;
  planned: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
}

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  invoice?: string;
}

const Budget: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  // Mock data - w rzeczywistości pobierane z API
  const totalBudget = 450000;
  const totalSpent = 287500;
  const totalRemaining = totalBudget - totalSpent;
  const budgetProgress = (totalSpent / totalBudget) * 100;

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: '1',
      category: 'Fundamenty',
      planned: 45000,
      spent: 45000,
      remaining: 0,
      percentage: 100,
      status: 'safe',
    },
    {
      id: '2',
      category: 'Stan surowy',
      planned: 120000,
      spent: 98500,
      remaining: 21500,
      percentage: 82,
      status: 'warning',
    },
    {
      id: '3',
      category: 'Instalacje',
      planned: 85000,
      spent: 62000,
      remaining: 23000,
      percentage: 73,
      status: 'safe',
    },
    {
      id: '4',
      category: 'Wykończenie',
      planned: 95000,
      spent: 45000,
      remaining: 50000,
      percentage: 47,
      status: 'safe',
    },
    {
      id: '5',
      category: 'Stolarka okienna',
      planned: 35000,
      spent: 37000,
      remaining: -2000,
      percentage: 106,
      status: 'danger',
    },
    {
      id: '6',
      category: 'Pozostałe',
      planned: 70000,
      spent: 0,
      remaining: 70000,
      percentage: 0,
      status: 'safe',
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2024-01-15',
      category: 'Stan surowy',
      description: 'Cement i materiały',
      amount: 12500,
      invoice: 'FV/2024/001',
    },
    {
      id: '2',
      date: '2024-01-20',
      category: 'Instalacje',
      description: 'Rury i armatura',
      amount: 8500,
      invoice: 'FV/2024/002',
    },
    {
      id: '3',
      date: '2024-01-25',
      category: 'Stolarka okienna',
      description: 'Okna PCV',
      amount: 37000,
      invoice: 'FV/2024/003',
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    date: '',
    category: '',
    description: '',
    amount: '',
    invoice: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleAddExpense = () => {
    const expense: Expense = {
      id: Date.now().toString(),
      date: newExpense.date,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      invoice: newExpense.invoice,
    };
    setExpenses([expense, ...expenses]);
    setOpenExpenseDialog(false);
    setNewExpense({ date: '', category: '', description: '', amount: '', invoice: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Kontrola Budżetu
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{ borderColor: '#2563EB', color: '#2563EB' }}
          >
            Import faktury
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenExpenseDialog(true)}
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
          >
            Dodaj wydatek
          </Button>
        </Box>
      </Box>

      {/* Budget Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Budżet całkowity
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
              {totalBudget.toLocaleString('pl-PL')} PLN
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Wydano
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F59E0B' }}>
              {totalSpent.toLocaleString('pl-PL')} PLN
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUpIcon sx={{ fontSize: 20, color: '#F59E0B', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {budgetProgress.toFixed(1)}% budżetu
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Pozostało
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10B981' }}>
              {totalRemaining.toLocaleString('pl-PL')} PLN
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingDownIcon sx={{ fontSize: 20, color: '#10B981', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {(100 - budgetProgress).toFixed(1)}% dostępne
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Budget Progress */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Wykorzystanie budżetu
        </Typography>
        <LinearProgress
          variant="determinate"
          value={budgetProgress}
          sx={{
            height: 12,
            borderRadius: 6,
            bgcolor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              bgcolor: budgetProgress > 90 ? '#EF4444' : budgetProgress > 75 ? '#F59E0B' : '#10B981',
              borderRadius: 6,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            0 PLN
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {budgetProgress.toFixed(1)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalBudget.toLocaleString('pl-PL')} PLN
          </Typography>
        </Box>

        {budgetProgress > 90 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <strong>Uwaga!</strong> Wykorzystano ponad 90% budżetu. Rozważ przegląd wydatków.
          </Alert>
        )}
        {budgetProgress > 75 && budgetProgress <= 90 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <strong>Ostrzeżenie:</strong> Wykorzystano ponad 75% budżetu. Monitoruj wydatki.
          </Alert>
        )}
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Budżet według kategorii" />
          <Tab label="Historia wydatków" />
          <Tab label="Prognozy" />
        </Tabs>
      </Paper>

      {/* Budget by Category */}
      {tabValue === 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Kategoria</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Planowano</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Wydano</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Pozostało</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Postęp</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{item.category}</TableCell>
                    <TableCell align="right">{item.planned.toLocaleString('pl-PL')} PLN</TableCell>
                    <TableCell align="right">{item.spent.toLocaleString('pl-PL')} PLN</TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        color: item.remaining < 0 ? '#EF4444' : '#10B981',
                        fontWeight: 600,
                      }}
                    >
                      {item.remaining.toLocaleString('pl-PL')} PLN
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(item.percentage, 100)}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#E5E7EB',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: getStatusColor(item.status),
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ minWidth: 45, fontWeight: 600 }}>
                          {item.percentage}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          item.status === 'safe' ? 'OK' :
                          item.status === 'warning' ? 'Uwaga' : 'Przekroczony'
                        }
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(item.status)}20`,
                          color: getStatusColor(item.status),
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ color: '#2563EB' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#EF4444' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Expense History */}
      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Kategoria</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Opis</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Kwota</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Faktura</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} hover>
                    <TableCell>{new Date(expense.date).toLocaleDateString('pl-PL')}</TableCell>
                    <TableCell>
                      <Chip label={expense.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {expense.amount.toLocaleString('pl-PL')} PLN
                    </TableCell>
                    <TableCell>
                      {expense.invoice && (
                        <Chip
                          icon={<ReceiptIcon />}
                          label={expense.invoice}
                          size="small"
                          sx={{ bgcolor: '#EEF2FF', color: '#2563EB' }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ color: '#2563EB' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#EF4444' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Forecasts */}
      {tabValue === 2 && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Prognozy budżetowe
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Na podstawie obecnego tempa wydatków, przewidujemy:
          </Alert>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card sx={{ border: '2px solid #DBEAFE' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Przewidywany koszt końcowy
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563EB', mb: 2 }}>
                  485 000 PLN
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Przekroczenie: <strong style={{ color: '#EF4444' }}>+35 000 PLN (+7.8%)</strong>
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ border: '2px solid #FEF3C7' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Przewidywana data wyczerpania
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F59E0B', mb: 2 }}>
                  15 czerwca 2024
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Za <strong>87 dni</strong> od dzisiaj
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Paper>
      )}

      {/* Add Expense Dialog */}
      <Dialog open={openExpenseDialog} onClose={() => setOpenExpenseDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nowy wydatek</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Data"
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Kategoria"
              select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              fullWidth
            >
              {budgetItems.map((item) => (
                <MenuItem key={item.id} value={item.category}>
                  {item.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Opis"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Kwota (PLN)"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              fullWidth
            />
            <TextField
              label="Numer faktury (opcjonalnie)"
              value={newExpense.invoice}
              onChange={(e) => setNewExpense({ ...newExpense, invoice: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpenseDialog(false)}>Anuluj</Button>
          <Button 
            onClick={handleAddExpense}
            variant="contained"
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
          >
            Dodaj wydatek
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Budget;

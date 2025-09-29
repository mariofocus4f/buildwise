import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  Description as DocumentIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';

interface Document {
  id: string;
  name: string;
  category: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  thumbnail?: string;
  description?: string;
}

const Documents: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Pozwolenie na budowę',
      category: 'Pozwolenia',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: '2024-01-05',
      uploadedBy: 'Jan Kowalski',
      description: 'Główne pozwolenie budowlane',
    },
    {
      id: '2',
      name: 'Projekt architektoniczny',
      category: 'Projekty',
      type: 'pdf',
      size: '15.8 MB',
      uploadedAt: '2024-01-10',
      uploadedBy: 'Architekt',
    },
    {
      id: '3',
      name: 'Fundamenty - dzień 1',
      category: 'Zdjęcia postępu',
      type: 'image',
      size: '4.2 MB',
      uploadedAt: '2024-02-01',
      uploadedBy: 'Jan Kowalski',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
    },
    {
      id: '4',
      name: 'Fundamenty - dzień 15',
      category: 'Zdjęcia postępu',
      type: 'image',
      size: '3.8 MB',
      uploadedAt: '2024-02-15',
      uploadedBy: 'Jan Kowalski',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
    },
    {
      id: '5',
      name: 'Faktura - cement',
      category: 'Faktury',
      type: 'pdf',
      size: '0.8 MB',
      uploadedAt: '2024-02-10',
      uploadedBy: 'System',
    },
    {
      id: '6',
      name: 'Stan surowy - ściany',
      category: 'Zdjęcia postępu',
      type: 'image',
      size: '5.1 MB',
      uploadedAt: '2024-03-20',
      uploadedBy: 'Jan Kowalski',
      thumbnail: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400',
    },
    {
      id: '7',
      name: 'Umowa - okna',
      category: 'Umowy',
      type: 'pdf',
      size: '1.2 MB',
      uploadedAt: '2024-03-05',
      uploadedBy: 'Marek Lewandowski',
    },
    {
      id: '8',
      name: 'Dach - konstrukcja',
      category: 'Zdjęcia postępu',
      type: 'image',
      size: '6.3 MB',
      uploadedAt: '2024-04-10',
      uploadedBy: 'Jan Kowalski',
      thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400',
    },
  ]);

  const categories = ['Wszystkie', 'Pozwolenia', 'Projekty', 'Faktury', 'Umowy', 'Zdjęcia postępu', 'Inne'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = tabValue === 0 || doc.category === categories[tabValue];
    return matchesSearch && matchesCategory;
  });

  const photos = documents.filter(d => d.type === 'image');
  const totalSize = documents.reduce((acc, doc) => {
    const size = parseFloat(doc.size);
    return acc + size;
  }, 0);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PdfIcon sx={{ fontSize: 48, color: '#EF4444' }} />;
      case 'image':
        return <ImageIcon sx={{ fontSize: 48, color: '#10B981' }} />;
      case 'doc':
        return <DocumentIcon sx={{ fontSize: 48, color: '#2563EB' }} />;
      default:
        return <FileIcon sx={{ fontSize: 48, color: '#6B7280' }} />;
    }
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDoc(doc);
    setOpenViewDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Dokumentacja Projektu
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Upload pliku
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Wszystkie pliki
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
                  {documents.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#EEF2FF', color: '#2563EB' }}>
                <FolderIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Zdjęcia postępu
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                  {photos.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#ECFDF5', color: '#10B981' }}>
                <ImageIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Całkowity rozmiar
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#F59E0B' }}>
                  {totalSize.toFixed(1)} MB
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#FEF3C7', color: '#F59E0B' }}>
                <DocumentIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Kategorie
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>
                  {categories.length - 1}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#F3E8FF', color: '#8B5CF6' }}>
                <FolderIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Szukaj dokumentów..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Category Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((cat, idx) => (
            <Tab key={idx} label={cat} />
          ))}
        </Tabs>
      </Paper>

      {/* Documents Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
        {filteredDocs.map((doc) => (
          <Box key={doc.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 },
                transition: 'box-shadow 0.3s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {doc.type === 'image' && doc.thumbnail ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={doc.thumbnail}
                  alt={doc.name}
                  sx={{ objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#F9FAFB',
                  }}
                >
                  {getFileIcon(doc.type)}
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: '1rem' }}>
                  {doc.name}
                </Typography>
                <Chip
                  label={doc.category}
                  size="small"
                  sx={{ alignSelf: 'flex-start', mb: 2, bgcolor: '#EEF2FF', color: '#2563EB', fontWeight: 600 }}
                />
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString('pl-PL')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Dodał: {doc.uploadedBy}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <IconButton
                    size="small"
                    sx={{ color: '#2563EB', flex: 1, border: '1px solid #2563EB' }}
                    onClick={() => handleViewDocument(doc)}
                  >
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: '#10B981', flex: 1, border: '1px solid #10B981' }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: '#EF4444', flex: 1, border: '1px solid #EF4444' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {filteredDocs.length === 0 && (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <FolderIcon sx={{ fontSize: 64, color: '#9CA3AF', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Brak dokumentów
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Nie znaleziono dokumentów pasujących do wyszukiwania' : 'Dodaj pierwszy dokument'}
          </Typography>
        </Paper>
      )}

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload dokumentu</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed #D1D5DB',
                bgcolor: '#F9FAFB',
                cursor: 'pointer',
                '&:hover': { borderColor: '#2563EB', bgcolor: '#EEF2FF' },
              }}
            >
              <UploadIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Przeciągnij plik lub kliknij aby wybrać
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PDF, JPG, PNG, DOC (max 50MB)
              </Typography>
            </Paper>
            <TextField label="Nazwa dokumentu" fullWidth />
            <TextField
              label="Kategoria"
              select
              fullWidth
            >
              {categories.slice(1).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Opis (opcjonalnie)"
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Anuluj</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        {selectedDoc && (
          <>
            <DialogTitle>{selectedDoc.name}</DialogTitle>
            <DialogContent>
              {selectedDoc.type === 'image' && selectedDoc.thumbnail ? (
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={selectedDoc.thumbnail}
                    alt={selectedDoc.name}
                    style={{ maxWidth: '100%', maxHeight: '500px' }}
                  />
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  {getFileIcon(selectedDoc.type)}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {selectedDoc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDoc.size} • {selectedDoc.type.toUpperCase()}
                  </Typography>
                </Box>
              )}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Szczegóły:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategoria: <strong>{selectedDoc.category}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data dodania: <strong>{new Date(selectedDoc.uploadedAt).toLocaleDateString('pl-PL')}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dodał: <strong>{selectedDoc.uploadedBy}</strong>
                </Typography>
                {selectedDoc.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {selectedDoc.description}
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)}>Zamknij</Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                sx={{ borderColor: '#2563EB', color: '#2563EB' }}
              >
                Pobierz
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Documents;

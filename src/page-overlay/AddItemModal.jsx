import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField, Typography, Divider,
  InputAdornment,Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const AddItemModal = ({
  showAddItemModal,
  handleCloseModal,
  handleChange,
  formData,
  combinedSubmit,
  formatNumber
}) => {

  const address = getIpAddress();
      
    function getIpAddress() {
      const hostname = window.location.hostname;
  
      const indexOfColon = hostname.indexOf(':');
  
      if(indexOfColon !== -1) {
        return hostname.substring(0, indexOfColon);
      }
  
      return hostname;
    }
  const [O_accPer, setO_accPer] = useState([])

  useEffect(() => {
    fetchO_accPer();
  }, []);

  const fetchO_accPer = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/fetchAccPers`) 
      const uniqueOptions_accPer = [...new Set(response.data)] // Remove duplicates
      setO_accPer(uniqueOptions_accPer)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
  }

  const handleAutocompleteChange = (fieldName) => (event, value) => {
    handleChange({ target: { name: fieldName, value } });
  };

  return (
    <Modal
      open={showAddItemModal}
      onClose={handleCloseModal}
      aria-labelledby="add-item-modal"
      aria-describedby="add-item-modal-description"
    >
      <Box
        component="form"
        onSubmit={combinedSubmit}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "1200px",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "maroon",
            backgroundColor: "yellow",
            paddingY: 1,
            marginBottom: 3,
          }}
        >
          ADD ITEM
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Accountability Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Accountability Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <Autocomplete
              freeSolo
              // options={[
              //   "Dr. Aliac, Chris Jordan G.",
              //   "Engr. Bacalso, Concordia C.",
              //   "Mr. Bañares, Niño James",
              //   "Engr. Bathan, Melvin E.",
              //   "Mrs. Boholst, Rainera C.",
              //   "Dr. Caudor, Vanessa A.",
              //   "Dr. Chong, Rachel M.",
              //   "Mr. Corbeta, Nendell Hanz R.",
              //   "Mr. Cortez, Butch M.",
              //   "Dr. Cuerda, Flordeliza M.",
              //   "Mrs. Diano, Rafaeliza P.",
              //   "Mr. Escario, John Gregory B.",
              //   "Dr. Feliscuzo, Larmie S.",
              //   "Engr. Granaderos, Anna Marie A.",
              //   "Engr. Jaim, Mary Ann G.",
              //   "Mrs. Jereza, Ma. Raina Romana V.",
              //   "Mr. Laviste, Ralph P.",
              //   "Atty. Mata, Hanna Mae M.",
              //   "Engr. Navares, Alein B.",
              //   "Dr. Pacaña, Arsenio C.",
              //   "Engr. Pacaña, Jonathan B.",
              //   "Engr. Rago, Erlyn Ivy O.",
              //   "Engr. Rama, Jurydel G.",
              //   "Atty. Sevilla, Janzen Joseph G.",
              //   "Dr. Suerte, Pablito G.",
              //   "Dr. Tacdoro, Arnie Ernesta M.",
              //   "Engr. Teves, Nicarter V.",
              //   "Engr. Tindoy, Rolando A.",
              //   "Atty. Valencia, Corazon E.",
              //   "Dr. Villacastin, Luni N.",
              //   "Engr. Villamor, Bernard Nicolas E.",
              //   "Mrs. Villamor, Ma. Socorro E.",
              //   "Mrs. Abellanosa, Melissa C.",
              //   "Mrs. Chua, Florabel H.",
              //   "Mrs. Chua, Ma. Socorro B.",
              //   "Mr. Daytia, George Osley Salon",
              //   "Mr. Delantar, Mitch Aristarchris A.",
              //   "Mrs. Dinampo, Violanda F.",
              //   "Engr. Galgo, Mae Jessica B.",
              //   "Ms. Ilagan, Liza P.",
              //   "Mr. Linao, Noel F.",
              //   "Engr. Ocan, Chum Keji A.",
              //   "Engr. Pacaña, Suzette B.",
              //   "Mrs. Rafols, Charyl A.",
              //   "Mr. Rago, Gensbergh G.",
              //   "Mrs. Rico, Madelline E.",
              //   "Engr. Solis, Alona M.",
              //   "Mr. Telamo, Melchor V.",
              //   "Mrs. Tiu, Rhea Antonette T.",
              //   "Mr. Torreon, John Rey L.",
              //   "Mrs. Ares, Shirley S.",
              //   "Mrs. Villamor, Ma. May S.",
              //   "Ms. Migallos, Consuelo R.",
              //   "Mrs. Ong, Irene A.",
              //   "Ms. Amanence, Shenley Jean A.",
              //   "Ms. Batusin, Mae Therese B.",
              //   "Mr. Cañamo, Mardit B.",
              //   "Ms. Sinangote, Yobhel M.",
              //   "Mr. Quiñanola Jr., Jaime I.",
              //   "Mr. Sanchez, Jose Clyde C.",
              //   "Mrs. Go, Milliscent G.",
              //   "Mr. Junas, Ralph John B.",
              //   "Mrs. Lim, Ines J.",
              //   "Mr. Tingal, Teody Mark D.",
              //   "Ms. Lumibaw, Sophia Zane Deniz M.",
              //   "Engr. Aguilar, Dioscoro Jr. R.",
              //   "Mr. Kwong, Ildebrando P.",
              //   "Mrs. Pitos, Edmalin J.",
              //   "Mr. Treyes, August Greg T.",
              //   "Ms. Baraquil, Shiela E.",
              //   "Mr. Abapo, Bryan Gil B.",
              //   "Mr. Baraga, Rizalito L.",
              //   "Ms. Cajipe, Rosemarie Blanche A.",
              //   "Mr. Lastimosa, Harold C.",
              //   "Mrs. Lumen, Glacy-May B.",
              //   "Mrs. Papasin, Maribel C.",
              //   "Ms. Malaga, Melma A.",
              //   "Mrs. De Guzman, Julieta S.",
              //   "Mrs. Rojas, Jennierose S.",
              //   "Mr. Alduezo, Errol C.",
              //   "Mrs. Alduezo, Jardine A.",
              //   "Mr. Gargaran, Jan Marlowe S.",
              //   "Mrs. Abaila, Myra A.",
              //   "Mr. Cabreros, Ashley Cabonelas",
              //   "Mrs. Quiñanola, Merly B.",
              //   "Mr. Rago, William, Jr. O.",
              //   "Mrs. Morcilla, Josephine R.",
              //   "Mrs. Faculin, Candy H.",
              //   "Ms. Omboy, Rhea E.",
              //   "Mrs. Perocho, Irma Balanquit",
              //   "Mrs. Abendan, Jennelyn B.",
              //   "Mrs. Nufable, Jennifer G.",
              //   "Mr. Torres, Chrisjay S.",
              //   "Mrs. Dela Cerna, Cheryl C.",
              //   "Mr. Alingasa, Gener P.",
              //   "Mrs. Cabucos, Imma Concepcion S.",
              //   "Mrs. Caminade, Catherine V.",
              //   "Mr. Cornejo, Albert James H.",
              //   "Ms. Dominguez, Gamaliel M.",
              //   "Mrs. Encorporado, Andrea Leah B.",
              //   "Mrs. Geronimo, Lehra G.",
              //   "Miss. Ho, Nizirisa M.",
              //   "Ms. Ayapana, Jahmaila",
              //   "Mrs. Lumagas, Soledad L.",
              //   "Ms. Manayaga, Mary Car A.",
              //   "Mrs. Moselina, Amor G.",
              //   "Mr. Muñoz, Richard W.",
              //   "Mrs. Narca, Rosafe E.",
              //   "Mrs. Pozon, Glenda A.",
              //   "Mrs. Restauro, Ma. Eleanor R.",
              //   "Ms. Roa, Donna Bella D.",
              //   "Ms. Romero, Yasmin Violeta B.",
              //   "Mrs. Ruiz, Bronwyn A.",
              //   "Mr. Contado, Shan Philip",
              //   "Mrs. Villatondo, Lyn R.",
              //   "Ms. Alao, Arianne Kay S.",
              //   "Mr. Amper, Rogelio Jr. A.",
              //   "Ms. Bercero, Zera Clarita Maai",
              //   "Ms. Canonigo, Rica S.",
              //   "Ms. Catubig, Jahna Joy C.",
              //   "Ms. Curambao, Imari A.",
              //   "Ms. Garcia, Alyssa Zuleima V.",
              //   "Ms. Lequigan, Juliana L.",
              //   "Mr. Macasero, Kim Anthony T.",
              //   "Ms. Manlapaz, Trisha Marie B.",
              //   "Ms. Tagaca, Lyndie V.",
              //   "Ms. Toriales, Crisleen Gyll B.",
              //   "Ms. Villar, Kathryn Melissa M.",
              //   "Ms. Watin, Cydy Ann A.",
              //   "Ms. Yap, Gilda A.",
              //   "Mrs. Yaranon, Emily D.",
              //   "Ms. Limosnero, Kate Maloon",
              //   "Mrs. Bacalso, Cyril E.",
              //   "Ms. Galan, Michelle T.",
              //   "Ms. Quiambao, Alegria C.",
              //   "Ms. Suazo, Daryl Joy A.",
              //   "Mr. Amolong, Manuel",
              //   "Mr. Musa, Ryan O.",
              //   "Ms. Vender, Ma. Archien A.",
              //   "Ms. Aparri, Jesthine Kate A.",
              //   "Mrs. Estrada, Rowela J.",
              //   "Ms. Lebumfacil, Lexie Claire",
              //   "Ms. Luay, Joanna Mae E.",
              //   "Ms. Mirasol, Janice S.",
              //   "Mrs. Ricardel, Bebeth D.",
              //   "Mrs. Rivera, Mayrelen N.",
              //   "Mrs. Sosas, Alma N.",
              //   "Mrs. Sumagaysay, Risalina A.",
              //   "Dr. Tausa, Roquito Neil D.",
              //   "Ms. Villaver, Maria Teresita R.",
              //   "Mrs. Lopez, Imelda D.",
              //   "Mrs. Etcuban, Roche B.",
              //   "Mrs. Albuera, Catherine II",
              //   "Mrs. Basalo, Grace M.",
              //   "Mrs. Cañete, Genevieve L.",
              //   "Dr. Creus, Ma. Arlene P.",
              //   "Dr. Lumayno, Maria Luz M.",
              //   "Dr. Quirante, Alan R.",
              //   "Dr. Rebosura, Cheyenne Kate Pueblos",
              //   "Mrs. Saberon, Rosario Ophelia O.",
              //   "Mrs. Ybas, Laarne B.",
              //   "Mr. Tanaleon, Jonefer O.",
              //   "Mr. Abando, Rosilo E.",
              //   "Mr. Arias, Jovany T.",
              //   "Mrs. Marquez, Jeny F.",
              //   "Mrs. Genson, Ma. Gina T.",
              //   "Mrs. Telamo, Merian C.",
              //   "Mr. Allego, Francisco Rey N.",
              //   "Mr. Anog, Jefferson Niño",
              //   "Mr. Ayacaide, Fredo N.",
              //   "Mr. Branzuela, Ariel B.",
              //   "Mr. Caballes, Emelio Jr. T.",
              //   "Mr. Cabaluna, Rennedy R.",
              //   "Mr. Cabangca, Edwin E.",
              //   "Mr. Caña, Ramel Roque D.",
              //   "Mr. Carillo Jr., Leodegario A.",
              //   "Mr. Deniega, Rudy T.",
              //   "Mr. Gapay, Wendell G.",
              //   "Mr. Gelig, Elmer B.",
              //   "Mr. Go, Alvin V.",
              //   "Mr. Inso, George A.",
              //   "Mr. Jacaban, Godofredo Jr. P.",
              //   "Mr. Llagoso, Leomides A.",
              //   "Mr. Mansueto, Tyrone Rolando T.",
              //   "Mr. Mata, Irvin T.",
              //   "Mr. Nayra, Dominick V.",
              //   "Mr. Olivar, Ramonito N.",
              //   "Ar. Ortiz, Clarisse Inez H.",
              //   "Mrs. Pedroza, Edgin O.",
              //   "Mrs. Pensona, Marissa R.",
              //   "Mr. Pozon, Ruel N.",
              //   "Mr. Quijano, Bernard N.",
              //   "Mr. Sescon, Manuelito V.",
              //   "Mrs. Tahum, Tina Marie R.",
              //   "Mr. Tañeca, Ronnie D.",
              //   "Mr. Tek-Ing, Rolando D.",
              //   "Mrs. Ulzoron, Claudine T.",
              //   "Mr. Valle, Randy C.",
              //   "Mr. Villaluna, Ariston B.",
              //   "Engr. Arañas, Ronelo C.",
              //   "Engr. Bendijo, Bernadette Joy R.",
              //   "Ms. Restauro, Jebee H.",
              //   "Mrs. Picardal, Marie Cris S.",
              //   "Mrs. Lumontad, Genevieve T.",
              //   "Mrs. Teves, Elfie Marie L.",
              //   "Engr. Laña, Marie Rose G.",
              //   "Mr. Cabije, Dexter E.",
              //   "Mr. Ferolino, Brian M.",
              //   "Mr. Ilagan, Angelo P.",
              //   "Engr. Luspoc, Celso E.",
              //   "Mr. Sopsop, Gabriel L.",
              //   "Mr. Montebon, Marlon Brandon P.",
              //   "Mr. Alicabo, Jims Achilles G.",
              //   "Mrs. Angus, Janice S.",
              //   "Ms. Celada, Jennibeth A.",
              //   "Mr. Cena, Rainer A.",
              //   "Mrs. Golez, Mary Antonette B.",
              //   "Mrs. Gubalane, Geraldine C.",
              //   "Ms. Lopez, Melissa E.",
              //   "Mr. Mangubat, James N.",
              //   "Mr. Millor, Arniel P.",
              //   "Mr. Restauro Jr., Cipriano V.",
              //   "Mr. Reyes, Arman R.",
              //   "Ms. Riel, Emily O.",
              //   "Mrs. Rio, Rachel B.",
              //   "Mrs. Simbajon, Joyce B.",
              //   "Mrs. Tan, Maricris O.",
              //   "Mr. Teves, Joseph Dante A.",
              //   "Ms. Abellana, Aileen Mae E.",
              //   "Mr. Cayampat, Lhudel M.",
              //   "Mrs. Infornon, Maria Beylen I.",
              //   "Ms. Napari, Avelita O.",
              //   "Mrs. Samodio, Bemaxminda R.",
              //   "Ms. Temanel, Pamela Dawn Q.",
              //   "Ms. Cuizon, Claire Angelie T.",
              // ]}
              options={O_accPer}
              onChange={handleAutocompleteChange("accPerson")}
              value={formData.accPerson}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  id="accPerson"
                  name="accPerson"
                  value={formData.accPerson}
                  onChange={handleChange}
                  //placeholder="Required*"
                  //required
                  label="Accountable Person"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid size={2.6}>
            <Autocomplete
              freeSolo
              options={[
                "Alumni Affairs Office",
                "CASE-Dean's Office",
                "CCS-Dean's Office",
                "CCS-IT / CREATE / NEXUSS",
                "CCS-MakerSpace",
                "CMBA-Dean's Office",
                "CMBA-DHTM",
                "CON",
                "CON-Dean's Office",
                "CORE-MARKETING",
                "CEA-ARCH",
                "CEA-CE",
                "CEA-CE / PCO",
                "CEA-CHE",
                "CEA-DEMP",
                "CEA-ECE",
                "CEA-EE",
                "CEA-EM",
                "CEA-ME",
                "CV-FIC",
                "ETEEAP",
                "Executive Office",
                "FAO",
                "GUIDANCE",
                "HRD",
                "ISD",
                "JHS",
                "LRAC",
                "MEDICAL-DENTAL CLINIC",
                "MIS-ISD",
                "MSDO",
                "MSDO - ATO",
                "NLO",
                "OAS",
                "OPC",
                "QAO",
                "RDCO",
                "SAFETY & SECURITY",
                "SSO",
                "SHS",
                "TSG",
                "URO",
                "URO-College",
                "URO-ELEM",
                "URO-HS",
                "URO-SHS",
              ]}
              value={formData.department}
              onChange={handleAutocompleteChange("department")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  id="department"
                  name="department"
                  //placeholder="Required*"
                  //required
                  label="Department"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              //placeholder="Required*"
              //required
              label="Designation"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Location Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Location Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="location.building"
              id="location.building"
              value={formData.location.building}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Inventory Location"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="location.room"
              id="location.room"
              value={formData.location.room}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Location Room"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Invoice Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Invoice Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <TextField
              fullWidth
              id="invoiceNumber"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Invoice Number"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12} md={4} sx={{ width: { xs: '100%', md: '20%' } }}>
            <TextField
              fullWidth
              id="invoiceDate"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              placeholder="Required*"
              pattern="[0-9]*"
              title="Please input valid year, e.g., 2024"
              required
              label="Invoice Date"
              //variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="issueOrder"
              id="issueOrder"
              value={formData.issueOrder}
              onChange={handleChange}
              placeholder="Required*"
              type="number" // Ensure only numbers can be input
              title="Please enter a numerical character (1-9)"
              required
              label="Issue Order"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Item Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Item Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="unitOfMeasurement"
              id="unitOfMeasurement"
              value={formData.unitOfMeasurement}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Unit of Measurement"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Required*"
              pattern="[0-9]*"
              title="Please enter a numerical character (1-9)"
              required
              label="Quantity"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              id="lifespan"
              name="lifespan"
              value={formData.lifespan}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Lifespan"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="supplier"
              id="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Supplier"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="remarks"
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Remarks"
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.serialNumber"
              id="description.serialNumber"
              value={formData.description.serialNumber}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Serial Number"
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Cost Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Cost Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={2.6}>
    <TextField
      fullWidth
      name="unitCost"
      id="unitCost"
      value={formatNumber(formData.unitCost)} // Format the displayed value
      onChange={handleChange}
      placeholder="Required*"
      pattern="[0-9]+([.][0-9]+)?"
      title="Please enter a valid number, e.g., 12.34"
      required
      label="Unit Cost"
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">₱</InputAdornment>
          ),
        },
      }}
    />
  </Grid>
          <Grid size={2.6}>
  <TextField
    fullWidth
    name="totalCost"
    id="totalCost"
    value={new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 2, // Ensure two decimal places
      maximumFractionDigits: 2,
    }).format(formData.totalCost)}
    onChange={handleChange}
    placeholder="Required*"
    pattern="[0-9]+([.][0-9]+)?"
    title="Please enter a valid number, e.g., 12.34"
    required
    label="Total Cost"
    variant="outlined"
    disabled
    InputProps={{
      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
    }}
  />
</Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Description Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Description Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.name"
              id="description.name"
              value={formData.description.name}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Description Name"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.model"
              id="description.model"
              value={formData.description.model}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Description Model"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.type"
              id="description.type"
              value={formData.description.type}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Description Type"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.other"
              id="description.other"
              value={formData.description.other}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Description Other"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid xs={12} sm={6} md={4} offset={{ md: "auto" }}>
          <Button
              type="button"
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 5,
                mr: 2,
                backgroundColor: "#e0e0e0",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                },
              }}
              onClick={handleCloseModal}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: 2,
                px: 5,
                backgroundColor: "#2196f3",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddItemModal;

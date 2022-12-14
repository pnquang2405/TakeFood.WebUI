import { Box, Button, Container, Divider, Grid, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Location from '../../components/location';
import PendingStatus from '../../components/stores/PendingStatus'
import Dropzone from 'react-dropzone';
import theme from '../../theme';
import UploadImage from '../../components/stores/UploadImage';
import { storeServices } from '../../services/stores.services';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const StoreRegister = () => {
  const ownerId = localStorage.getItem("UserId")
  const token = localStorage.getItem("AccessToken")
  const [helperText, setHelperText] = useState('')

  let navigate = useNavigate()

  const [storeName, setStoreName] = useState('')
  const [storePhone, setStorePhone] = useState('')
  const [address, setAddress] = useState({})
  const [street, setStreet] = useState('')
  const [urlStoreImage, setUrlStoreImage] = useState('')
  const [urlKitchenImage, setUrlKitchenImage] = useState('')
  const [urlMenuImage, setUrlMenuImage] = useState('')
  const [nameOwner, setNameOwner] = useState('')
  const [cmnd, setCmnd] = useState('')
  const [urlFontCmndImage, setUrlFontCmndImage] = useState('')
  const [urlBackCmndImage, setUrlBackCmndImage] = useState('')
  const [urlLicenseImage, setUrlLicenseImage] = useState('')
  const [nameSTKOwner, setNameSTKOwner] = useState('')
  const [stk, setStk] = useState('')
  const [nameBank, setNameBank] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [taxID, setTaxID] = useState('')
  const [category, setCategory] = useState([])
  const [categoryList, setCategoryList] = useState([])

  const [isPending, setIsPending] = useState(false)


  useEffect(() => {
    async function getStoreCategories() {
      const categories = []
      await storeServices.getStoreCategories()
        .then((res) => {
          res.data.map((category) => {
            categories[category.categoryId] = category.name
          })
          setCategoryList(categories)
        })
        .catch((error) => {
          console.log("Error", error)
        })
    }
    getStoreCategories()
  }, [])

  //pass data from child components
  const getLocationData = (location) => {
    setAddress(location)
  }
  const getStoreImage = (file) => {
    setUrlStoreImage(file)
  }
  const getKitchenImage = (file) => {
    setUrlKitchenImage(file)
  }
  const getMenuImage = (file) => {
    setUrlMenuImage(file)
  }
  const getFrontCmndImage = (file) => {
    setUrlFontCmndImage(file)
  }
  const getBackCmndImage = (file) => {
    setUrlBackCmndImage(file)
  }
  const getLicenseImage = (file) => {
    setUrlLicenseImage(file)
  }
  const [categoriesId, setCategoriesId] = useState([])
  const handleChange = (event, key) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setCategoriesId([{ CategoryID: key.key.slice(2) }])
  };

  const notifyText = (textField) => {
    if (!textField) {
      setHelperText('H??y nh???p th??ng tin')
    } else {
      setHelperText('')
    }
  }

  async function handleSubmit(event) {
    console.log(address)
    const info = {
      name: storeName,
      phone: storePhone,
      urlStoreImage: urlStoreImage,
      urlKitchenImage: urlKitchenImage,
      urlMenuImage: urlMenuImage,
      nameOwner: nameOwner,
      cmnd: cmnd,
      urlFontCmndImage: urlFontCmndImage,
      urlBackCmndImage: urlBackCmndImage,
      urlLicenseImage: urlLicenseImage,
      nameSTKOwner: nameSTKOwner,
      STK: stk,
      NameBank: nameBank,
      BankBranch: bankBranch,
      TaxID: taxID,
      Categories: categoriesId,
      address: {
        Province: address['city'],
        District: address['district'],
        Town: address['ward'],
        Lat: 16.073877,
        lng: 108.149892,
        Stress: street
      }
    }
    console.log(info)
    try {
      const store = await storeServices.createStore(info, ownerId, token)
      if (store) {
        console.log("Oke roi do")
        navigate('/store')
      }
    } catch (error) {
      console.log(error.response.data)
    }

  }
  return (
    <div>
      {!isPending ? (
        <Box
          display="flex"
          justifyContent={"center"}
          flexDirection={'column'}
          paddingY={4}
          paddingX={7}
          marginY={3}
          marginX={13}
          sx={{ backgroundColor: 'white' }}
        >
          <Typography align='center' variant='h6'
            sx={{ fontWeight: "bold" }}
            color={theme.palette.primary.main}>
            ????NG K?? C???A H??NG TR??N FOORDER
          </Typography>
          <Typography mt={2}>
            T??n c???a h??ng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth required
            size='small' margin="dense" type={'text'}
            onChange={(e) => setStoreName(e.target.value)}
            error={helperText}
            helperText={helperText}
            onBlur={() => notifyText(storeName)}
          >
          </TextField>
          <Typography mt={2}>
            S??? ??i???n tho???i c???a h??ng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size='small' margin="dense" type={'text'}
            onChange={(e) => setStorePhone(e.target.value)}
          >
          </TextField>
          <Typography mt={2}>
            Lo???i c???a h??ng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <Select
            size='small'
            multiple
            value={category}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {Object.entries(categoryList).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                <ListItemText primary={value} />
              </MenuItem>
            ))}
          </Select>

          <Typography mt={2}>
            M?? s??? thu??? <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size='small' margin="dense" type={'text'}
            onChange={(e) => setTaxID(e.target.value)}
          >
          </TextField>
          <Typography mt={2}>
            ?????a ch??? <span style={{ color: "#E25B45" }}>*</span>
          </Typography>

          <Location getLocationData={getLocationData} />

          <TextField
            fullWidth
            size='small' margin="dense" type={'text'}
            placeholder="S??? nh??, ???????ng"
            onChange={(e) => setStreet(e.target.value)}
            error={helperText}
            helperText={helperText}
            onBlur={() => notifyText(street)}
          >
          </TextField>
          <Divider sx={{ marginY: 2 }} />
          {/* hinh mat tien cua hang */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                H??nh ???nh m???t ti???n c???a c???a h??ng <span style={{ color: "#E25B45" }}>*</span>
                (h??nh ch???p th???c t???, r?? n??t, kh??ng qua ch???nh s???a, th??? hi???n ????? 3 y???u t???: b???ng hi???u, ?????a ch???, kh??ng gian)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Store'} getData={getStoreImage} />
            </Grid>
            {/* H??nh ???nh b???p, khu v???c ch??? bi???n * */}
            <Grid item xs={6}>
              <Typography>
                H??nh ???nh b???p, khu v???c ch??? bi???n <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Kitchen'} getData={getKitchenImage} />
            </Grid>
            {/* H??nh ???nh th???c ????n */}
            <Grid item xs={6}>
              <Typography>
                H??nh ???nh th???c ????n <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Menu'} getData={getMenuImage} />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />
          <Typography>
            Th??ng tin ch??? s??? h???u <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                placeholder='T??n ch??? s??? h???u'
                onChange={(e) => setNameOwner(e.target.value)}
                error={helperText}
                helperText={helperText}
                onBlur={() => notifyText(nameOwner)}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                placeholder='S??? CMND/CCCD'
                onChange={(e) => setCmnd(e.target.value)}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                (M???t tr?????c CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <UploadImage height={'20vw'} OwnerID={ownerId} fileName={'FrontCMND'} getData={getFrontCmndImage} />
            </Grid>
            <Grid item xs={6}>
              <Typography>
                (M???t sau CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <UploadImage height={'20vw'} OwnerID={ownerId} fileName={'BackCMND'} getData={getBackCmndImage} />
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Gi???y ph??p kinh doanh <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'35vw'} OwnerID={ownerId} fileName={'License'} getData={getLicenseImage} />
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                T??n ch??? t??i kho???n ng??n h??ng <span style={{ color: "#E25B45" }}>*</span> (vi???t hoa kh??ng d???u)
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                onChange={(e) => setNameSTKOwner(e.target.value)}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                S??? t??i kho???n <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                onChange={(e) => setStk(e.target.value)}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                T??n ng??n h??ng <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                onChange={(e) => setNameBank(e.target.value)}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Chi nh??nh <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                onChange={(e) => setBankBranch(e.target.value)}
                error={helperText}
                helperText={helperText}
                onBlur={() => notifyText(bankBranch)}>
              </TextField>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large"
              onClick={handleSubmit}
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 'fit-content'
              }}
            >G???I TH??NG TIN</Button>
          </Container>

        </Box >) : <PendingStatus />}
    </div >
  )
}

export default StoreRegister

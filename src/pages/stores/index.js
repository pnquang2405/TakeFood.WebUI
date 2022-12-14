import { Box, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DefaultLayout from '../../components/Layout/DefaultLayout'
import Header from '../../components/Layout/DefaultLayout/Header/Header'
import PendingStatus from '../../components/stores/PendingStatus'
import { storeServices } from '../../services/stores.services'

const Store = () => {
  let navigate = useNavigate()
  const [isAccepted, setIsAccepted] = useState(false)
  const [storeInfo, setStoreInfo] = useState({})
  const [isLoading, setLoading] = useState(true)
  const mainColor = "#89D5C9"

  useEffect(() => {
    async function getStoreInfo(userId, token) {
      try {
        const store = await storeServices.getStore(userId, token)
        if (store.data) {
          console.log(store.data)
          setStoreInfo(store.data)
          if (store.data.State === 'Active') {
            setIsAccepted(true)
          }
          localStorage.setItem("StoreId", store.data.storeId)
        }
        else {
          navigate('/storeRegister')
        }
      } catch (error) {
        console.log(error.response.data)
      } finally {
        setLoading(false)
      }
    }
    const userId = localStorage.getItem("UserId")
    const token = localStorage.getItem("AccessToken")
    getStoreInfo(userId, token)
  }, [])

  return (
    <>
      {
        isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) :
          (
            !isAccepted ? <><Header /><PendingStatus /></> :
              <DefaultLayout>
                <Box
                  display="flex"
                  justifyContent={"start"}
                  flexDirection={'column'}
                  padding={2}
                  margin={3}
                  sx={{
                    height: 'calc(80vh - 20px)',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 5px lightgrey'
                  }}>
                  <Stack
                    divider={<Divider flexItem />}
                    spacing={2}
                  >
                    <Grid container columns={16} spacing={3}>
                      <Grid item xs={5}>
                        <Typography>T??n c???a h??ng</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.NameStore}</Typography>
                        <Typography>?????a ch???</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.Address} </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>S??T</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.Phone}</Typography>
                        <Typography>Email</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.Email}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>T??n ch??? s??? h???u</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.NameOwner}</Typography>
                        <Typography>S??? CMND/CCCD</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.CMND}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>S??? t??i kho???n ng??n h??ng</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.STK}</Typography>
                        <Typography>T???i ng??n h??ng</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color={mainColor}>{storeInfo.NameBank}</Typography>
                      </Grid>
                    </Grid>
                    <Typography>
                      C???a h??ng ??ang c?? <span style={{ color: mainColor, fontWeight: 'bold' }}>{storeInfo.QuantityOfFood}</span> m??n ??n
                    </Typography>
                    <Typography>
                      C???a h??ng ??ang c?? 1 ????n h??ng ch??a ???????c x??? l??
                      <Link to="/store/" style={{ color: mainColor, marginLeft: 20 }}>Xem ngay</Link>
                    </Typography>
                  </Stack>
                </Box>
              </DefaultLayout>
          )
      }
    </>
  )
}

export default Store

import React, { useState } from 'react'
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CreateTopping from '../../components/stores/CreateTopping';
import { useEffect } from 'react';
import { storeServices } from '../../services/stores.services';
import ToppingItem from '../../components/stores/ToppingItem';
import CircularProgress from '@mui/material/CircularProgress';


const Topping = () => {
  const [openCreateBox, setOpenCreateBox] = useState(false)
  const [toppingList, setToppingList] = useState([])
  const [isLoading, setLoading] = useState(true)

  // console.log("toppingList", toppingList)
  const openClick = () => {
    setOpenCreateBox(!openCreateBox)
  }
  const token = localStorage.getItem("AccessToken")
  const storeId = localStorage.getItem("StoreId")

  async function getTopping(storeId, token) {
    try {
      const toppingData = await storeServices.getTopping(storeId, token)
      if (toppingData) {
        setToppingList(toppingData.data)
      }
    } catch (error) {
      console.log(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTopping(storeId, token)
    // console.log("topping list", toppingList)
  }, [])


  return (
    <Stack
      // alignItems="flex-end"

      sx={{
        paddingY: 3,
        paddingX: '10vw',
      }}>
      {
        isLoading ? (
          <div style={{ alignSelf: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table size="small" sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead sx={{ borderBottom: '2px solid black' }}>
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Tên</TableCell>
                    <TableCell align="center">Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toppingList.length > 0 && toppingList.map((topping, stt) => (
                    <ToppingItem topping={topping} key={stt} stt={stt} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {openCreateBox ?
              <CreateTopping /> : null
            }
            <div style={{ alignSelf: 'flex-end' }}>
              <Button
                variant='contained' size="large"
                onClick={openClick}
                sx={{ width: 'fit-content', marginTop: 2 }}>
                {openCreateBox ? "Thoát" : "Thêm topping"}
              </Button>
            </div>
          </>
        )
      }
    </Stack>
  )
}

export default Topping

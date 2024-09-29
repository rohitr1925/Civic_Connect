import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';

const AllSRS = () => {
  const dispatch = useDispatch();
  const { complainsList, loading } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'typeOfTicket', label: 'Type of Ticket', minWidth: 100 },
    { id: 'location', label: 'Location', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];

  return (
    <>
    <h2>All Service Requests</h2>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          Loading...
        </Box>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {complainsList.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {complainColumns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complainsList.map((complain) => (
                    <TableRow key={complain._id}>
                      <TableCell align="center">{complain.user}</TableCell>
                      <TableCell align="center">{complain.description}</TableCell>
                      <TableCell align="center">{complain.typeOfTicket}</TableCell>
                      <TableCell align="center">{complain.location}</TableCell>
                      <TableCell align="center">{complain.date.substring(0, 10)}</TableCell>
                      <TableCell align="center">{complain.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              No complains found.
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default AllSRS;

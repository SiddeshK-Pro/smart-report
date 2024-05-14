import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination, Link as LinkButton, Container, Typography } from '@mui/material';
import { getToken } from '../utils/Authentication';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Navigation from '../components/Navigation';

const History = () => {
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const responseJSON = await fetch(`http://localhost:1337/api/v1/user/reports?page=${page}&limit=${rowsPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': getToken()
                },
            });
            const response = await responseJSON.json();
            setReports(response.data);
            setTotal(response.total);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Navigation />
			<Container>
				<Typography variant='h4' gutterBottom marginTop={4}>Report History</Typography>
				{loading ? (
					<CircularProgress />
				) : (
					<React.Fragment>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Report Type</TableCell>
										<TableCell>Date of Test</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{reports && Array.isArray(reports) && reports.map(report => (
										<TableRow key={report._id}>
											<TableCell>{report.reportType}</TableCell>
											<TableCell>{report.dateOfTest ? dayjs(report.dateOfTest).format("DD/MM/YYYY") : ""}</TableCell>
											<TableCell><Link to={`/generate-report/${report.reportType}?id=${report._id}`}><LinkButton>View</LinkButton></Link></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={total}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</React.Fragment>
				)}
			</Container>
        </div>
    );
}

export default History;

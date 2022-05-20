import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow
} from '@mui/material';
import type {NextPage} from 'next'
import Page from '../../src/containers/Page/Page';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Edit} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../../src/types/common';

import styles from '../../styles/Content.module.css'

type CardExtended = Required<Card> & {
    _id: string;
    name: string;
}

function TablePaginationActions(props: any) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const CardsList: NextPage = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    async function getCards() {
        try {
            const cardsResp = await fetch(`/api/cards?rowsPerPage=${rowsPerPage}&page=${page}`);
            const cardsJson = await cardsResp.json();
            setCards(cardsJson.cards);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCards();
    }, []);

    useEffect(() => {
        const shouldLoad = page >= Math.floor(rows.length / rowsPerPage) - 1;

        if(shouldLoad) {
            getCards();
        }

    }, [page]);

    const rows: CardExtended[] = cards.map((card) => card);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Page title='CardList'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <div>
                                        {row.account}
                                    </div>
                                    <div>
                                        {row.description.slice(0, 64)}
                                    </div>
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    <Image src={'https://img.youtube.com/vi/lnRlhD398RE/0.jpg'} width="80px" height="45px" />
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.videoUrl.slice(0, 32)}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.likes}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    <Link href={`/content/${row._id}`}>
                                        <IconButton >
                                            <Edit />
                                        </IconButton>

                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                //   rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                rowsPerPageOptions={[10, 25, 50]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Page>
    )
}

export default CardsList;

import {Dispatch, SetStateAction, useEffect} from 'react';
import {
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
import {Edit} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import {Card} from '../../types/common';
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions';
import {CardExtended} from '../../../pages/content/list';

type CardListProps = {
    cards: Card[];
    setCards: Dispatch<SetStateAction<CardExtended[]>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
};

const PaginationTable: NextPage<CardListProps> = ({
    cards,
    setCards,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
}) => {
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

    const rows: Required<Card>[] = cards.map((card) => card as Required<Card>);

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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <h4>
                                    {row.account}
                                </h4>
                                <div>
                                    {row.description.slice(0, 64)}
                                </div>
                                <div>
                                    {row._id}
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
                                    <IconButton>
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
    );
}

export default PaginationTable;

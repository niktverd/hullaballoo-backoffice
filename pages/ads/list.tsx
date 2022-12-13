import type { NextPage } from 'next';
import { shuffle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Player from '../../src/components/Player/Player';
import getYouTubeID from "get-youtube-id";

import styles from '../../styles/AdsList.module.css'

const COLUMNS = 10;

export function getYoutubeCover(videoUrl: string) {
    var id = getYouTubeID(videoUrl);

    if (!id) {
        return undefined;
    }

    return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
}

const createId = (colIndx: number, vidoIndx?: number) => {
    return `id-${colIndx}${vidoIndx !== undefined ? `-${vidoIndx}` : ''}`;
}

const scrollRandom = (colIndx: number, videoIndx: number) => {
    const videoId = createId(colIndx, videoIndx);
    window.location.hash = videoId;
}

const videos = [
    "https://www.youtube.com/shorts/oGde1cKV4vg",
    "https://www.youtube.com/shorts/pd6MctG9ZdM",
    "https://www.youtube.com/shorts/kc26DV5_xKI",
    "https://www.youtube.com/shorts/eCd1RAOE5rw",
    "https://www.youtube.com/shorts/0cEcg9Iu3R8",
    "https://www.youtube.com/shorts/lJWUzoL9V1w",
    "https://www.youtube.com/shorts/-ZFOQFOEsFQ",
    "https://www.youtube.com/shorts/UunhlEyUGR8",
    "https://www.youtube.com/shorts/4gF8G2gNAdY",
    "https://www.youtube.com/shorts/PebcqNDuxoM",
    "https://www.youtube.com/shorts/dpL2VxZUdvE",
    "https://www.youtube.com/shorts/CamdiBrM9Io",
    "https://www.youtube.com/shorts/K_xiugkwYhw",
    "https://www.youtube.com/shorts/fb0I1N2aX1Y",
    "https://www.youtube.com/shorts/q6TRjE_dn7w",
    "https://www.youtube.com/shorts/q6TRjE_dn7w",
    "https://www.youtube.com/shorts/pRoYKidqnUo",
    "https://www.youtube.com/shorts/xcKdEYZsZgg",
    "https://www.youtube.com/shorts/qqFQFSuaHgk",
    "https://www.youtube.com/shorts/OtqwHTV50kE",
    "https://www.youtube.com/shorts/yD1AUiSRQB0",
    "https://www.youtube.com/shorts/HoZQ2BbDZK0",
    "https://www.youtube.com/shorts/Z_PNqxnxxT4",
    "https://www.youtube.com/shorts/FwwdNdDzxNI",
    "https://www.youtube.com/shorts/BiB1ETva3cg",
    "https://www.youtube.com/shorts/lIhA00pLZ7Y",
    "https://www.youtube.com/shorts/O5j1ePragTg",
    "https://www.youtube.com/shorts/z9ALlsxyH4Q",
    "https://www.youtube.com/shorts/TsxM_76dwO8",
    "https://www.youtube.com/shorts/0ux0yw6gTt0",
    "https://www.youtube.com/watch?v=52dae5aLecg",
    "https://www.youtube.com/shorts/NyJAa8SrUTs",
    "https://www.youtube.com/shorts/UNfxC57J2zk",
    "https://www.youtube.com/shorts/YTlPYH7lDOU",
    "https://www.youtube.com/shorts/BUXaRPosVIY",
    "https://www.youtube.com/shorts/-yHH70--60I",
    "https://www.youtube.com/shorts/zIPbHt7N2O8",
    "https://www.youtube.com/shorts/mszubCO8IyE",
    "https://www.youtube.com/watch?v=-6fjWG4x1Cw",
    "https://www.youtube.com/shorts/tftR5Ujxoc0",
    "https://www.youtube.com/shorts/1KhCwGBXpFU",
    "https://www.youtube.com/shorts/4M-Rzv80890",
    "https://www.youtube.com/shorts/IdZhavX4LQ8",
    "https://www.youtube.com/shorts/eyd4IvqlFCg",
    "https://www.youtube.com/shorts/5c8OqakcbGk",
    "https://www.youtube.com/shorts/4VvN4R7zYPc",
    "https://www.youtube.com/shorts/J2F1anL15ZE",
    "https://www.youtube.com/shorts/Vpk5IfsJS8Q",
    "https://www.youtube.com/shorts/Fqut2rmrZm4",
    "https://www.youtube.com/shorts/ksSCI3nyu5k",
    "https://www.youtube.com/shorts/bhFR-XZieWA",
    "https://www.youtube.com/shorts/uXNYn-pZEx8",
    "https://www.youtube.com/shorts/CVVLz5aT14c",
    "https://www.youtube.com/shorts/14VQTllxUqE",
    "https://www.youtube.com/shorts/B64756mrE9Y",
    "https://www.youtube.com/shorts/ckuGaqvwC88",
    "https://www.youtube.com/shorts/9cDhvmFmMkw",
    "https://www.youtube.com/shorts/-2ZlD33rbDU",
    "https://www.youtube.com/shorts/Ksg6khWeCL8",
    "https://www.youtube.com/shorts/C5fX2BMrFEw",
    "https://www.youtube.com/shorts/zzUrKEgLyaQ",
    "https://www.youtube.com/shorts/Sw0PtbbHGjw",
    "https://www.youtube.com/shorts/hTNhnzmqlNg",
    "https://www.youtube.com/shorts/oSipdqbrDlQ",
    "https://www.youtube.com/shorts/tC3EGa0r2mw",
    "https://www.youtube.com/shorts/wWhzCL7GhAM",
    "https://www.youtube.com/shorts/DYZxtKc6rEg",
    "https://www.youtube.com/shorts/54sSmvemseg",
    "https://www.youtube.com/shorts/l6w8BL8SWRM",
    "https://www.youtube.com/shorts/pRK7dRs-n5Y",
    "https://www.youtube.com/shorts/gNqWwt_T7zY",
    "https://www.youtube.com/shorts/Mlc6xd9zD7E",
    "https://www.youtube.com/shorts/JZh0jqFVB-c",
    "https://www.youtube.com/shorts/6ZMgYjrp8-s",
    "https://www.youtube.com/shorts/kwRIZ9eMo60",
    "https://www.youtube.com/shorts/vuzfUohBI9k",
    "https://www.youtube.com/shorts/RDbF6Tqb1fU",
    "https://www.youtube.com/shorts/NZEg-u1zWis",
    "https://www.youtube.com/shorts/oiIdRhFi9IQ",
    "https://www.youtube.com/shorts/43dcH6ka7RE",
    "https://www.youtube.com/shorts/vR0-HQx6Xq0",
    "https://www.youtube.com/shorts/UgQpIAfqErI",
    "https://www.youtube.com/shorts/eODttKkJjqs",
    "https://www.youtube.com/shorts/DLIrcLca60g",
    "https://www.youtube.com/shorts/iehjR2SvBnI",
    "https://www.youtube.com/shorts/NXdXsrJxafo",
    "https://www.youtube.com/shorts/v3hH9HgiKZI",
    "https://www.youtube.com/shorts/wCxBPW-S3-s",
    "https://www.youtube.com/shorts/09_7K0URn0M",
    "https://www.youtube.com/shorts/uAT3IEPO3So",
    "https://www.youtube.com/shorts/-CBG0LtG8Rc",
    "https://www.youtube.com/shorts/qdPZMD7D9lk",
    "https://www.youtube.com/shorts/N6h3uU6KGzc",
    "https://www.youtube.com/shorts/fovKq4YHK14",
    "https://www.youtube.com/shorts/Zr0MZ8NQeYs",
    "https://www.youtube.com/shorts/pi4dwlPm5K8",
    "https://www.youtube.com/shorts/UapCWZ_egMk",
    "https://www.youtube.com/shorts/a1EQpEo2LQ0",
    "https://www.youtube.com/shorts/-fYiJyZ-ORI",
    "https://www.youtube.com/shorts/zNOg6SBUaT8",
    "https://www.youtube.com/shorts/as7WCiCkCEk",
    "https://www.youtube.com/shorts/gD2ieFNjFY0",
    "https://www.youtube.com/shorts/bjBzwjIvrK0",
    "https://www.youtube.com/shorts/DJt3CfOUbgE",
    "https://www.youtube.com/shorts/KXOdJRUEds8",
    "https://www.youtube.com/shorts/ueJqmfJLJE4",
    "https://www.youtube.com/shorts/D6i2yigywrk",
    "https://www.youtube.com/shorts/Hsm98k_-b5w",
    "https://www.youtube.com/watch?v=rhh_GKLwqvo",
    "https://www.youtube.com/watch?v=4XOQhfVHTlY",
    "https://www.youtube.com/shorts/GfKrkYPwC4M",
    "https://www.youtube.com/shorts/-jC-OsUkgmE",
    "https://www.youtube.com/watch?v=U65eDCTtdLE",
    "https://www.youtube.com/shorts/ibZdVWEK5ik",
    "https://www.youtube.com/shorts/r5z6rrjfxZ0",
    "https://www.youtube.com/shorts/U2FqEqmsvcQ",
    "https://www.youtube.com/shorts/VSzd4FcbR-s",
    "https://www.youtube.com/shorts/-v5P5_ysEBM",
    "https://www.youtube.com/shorts/cxYb56ofgCw",
    "https://www.youtube.com/shorts/V55BnxN7P9M",
    "https://www.youtube.com/shorts/N4MROMwCCfI",
    "https://www.youtube.com/shorts/P99lWBpv4I8",
    "https://www.youtube.com/shorts/cV8izDlJlRE",
    "https://www.youtube.com/shorts/zXGXVqeAUJo",
    "https://www.youtube.com/shorts/rGqTcMFG3yE",
    "https://www.youtube.com/shorts/B9swC9iQHS8",
    "https://www.youtube.com/shorts/zQP9-xc3PtQ",
    "https://www.youtube.com/shorts/OpmgPlY5xMw",
    "https://www.youtube.com/shorts/q3d1MuZighk",
    "https://www.youtube.com/shorts/hcBj7sc89K0",
    "https://www.youtube.com/shorts/V34Z4C_maLg",
    "https://www.youtube.com/shorts/guTHOUmzRw0",
    "https://www.youtube.com/shorts/4YCIbcz6VHY",
    "https://www.youtube.com/shorts/W3-Va1SKOUI",
    "https://www.youtube.com/shorts/BkXr2eFes-8",
    "https://www.youtube.com/shorts/DlQ11MYTE_g",
    "https://www.youtube.com/shorts/22p-xN124u8",
    "https://www.youtube.com/shorts/EuEenUC9vVE",
    "https://www.youtube.com/shorts/uwpV-mcucqw",
    "https://www.youtube.com/shorts/eI_QZS21Jzk",
    "https://www.youtube.com/shorts/X6ryik5csk4",
    "https://www.youtube.com/shorts/JzIv8CQ_LSY",
    "https://www.youtube.com/shorts/B-x7xXbK_Vk",
    "https://www.youtube.com/shorts/D8dtf5PKuFU",
    "https://www.youtube.com/shorts/vgLNCe-D_bY",
    "https://www.youtube.com/shorts/6MEtIxAF2tY",
    "https://www.youtube.com/shorts/W5m_5ZaUYWk",
    "https://www.youtube.com/shorts/DmalYxsRLaM",
    "https://www.youtube.com/shorts/C4b9w93epT0",
    "https://www.youtube.com/shorts/2dsvgjKjY94",
    "https://www.youtube.com/shorts/8BivI2VpcRs",
    "https://www.youtube.com/shorts/3Rm5IEANjNM",
    "https://www.youtube.com/shorts/Og-LiakmXW4",
    "https://www.youtube.com/shorts/2y3A3TYLLeg",
    "https://www.youtube.com/shorts/NPAP0JSLxRg",
    "https://www.youtube.com/shorts/1mgh_yIziRI",
    "https://www.youtube.com/shorts/ygR5BmJReaE",
    "https://www.youtube.com/shorts/Gjv5FOpafwI",
    "https://www.youtube.com/shorts/GpVZosQGOV4",
    "https://www.youtube.com/shorts/rq4XQzvZtxk",
    "https://www.youtube.com/shorts/w-E1hTB5mQs",
    "https://www.youtube.com/shorts/BAK5x4cacLM",
    "https://www.youtube.com/shorts/RVV_EgzfbKk",
    "https://www.youtube.com/shorts/tctWu8Yq-LQ",
    "https://www.youtube.com/shorts/LDj07jzTJVI",
    "https://www.youtube.com/shorts/ScJI0ZjuDUM",
    "https://www.youtube.com/shorts/JR404wz8viY",
    "https://www.youtube.com/shorts/0xbWXHTKYvQ",
    "https://www.youtube.com/shorts/IFP2qDV7paQ",
    "https://www.youtube.com/shorts/bZJr_V5m51U",
    "https://www.youtube.com/shorts/WU03I94vquc",
    "https://www.youtube.com/shorts/3amgfwSg1Vw",
    "https://www.youtube.com/shorts/DkTiBbi3TIQ",
    "https://www.youtube.com/shorts/xEbbUhavvRc",
    "https://www.youtube.com/shorts/qSqwjbRGYTg",
    "https://www.youtube.com/shorts/yemQPbpsCsE",
    "https://www.youtube.com/shorts/hOtyks7uMjY",
    "https://www.youtube.com/shorts/RMLHkjO6Umo",
    "https://www.youtube.com/shorts/d-plH07Aom8",
    "https://www.youtube.com/shorts/LwyKVUqUuzs",
    "https://www.youtube.com/shorts/dNhJHka7iXw",
    "https://www.youtube.com/shorts/3PyWqhMql3A",
    "https://www.youtube.com/shorts/7upuabODDSU",
    "https://www.youtube.com/shorts/7yrYokhSp1I",
    "https://www.youtube.com/shorts/zriz2n2OCec",
    "https://www.youtube.com/shorts/rSf846LD8J4",
    "https://www.youtube.com/shorts/Ob-9Fx8wgV0",
    "https://www.youtube.com/shorts/qchlt4_0tgU",
    "https://www.youtube.com/shorts/BHiJLKlpChg",
    "https://www.youtube.com/shorts/vRC11YeSIps",
    "https://www.youtube.com/shorts/AEcUDg7UmDg",
    "https://www.youtube.com/shorts/Y9sB8VH_HQc",
    "https://www.youtube.com/shorts/_cgmDPjXW0Y",
    "https://www.youtube.com/shorts/0OmvcRUcIHI",
    "https://www.youtube.com/shorts/x7DQfdHuNuA",
    "https://www.youtube.com/shorts/aI68cpALs0c",
    "https://www.youtube.com/shorts/l4ZJMt9Oe3M",
    "https://www.youtube.com/shorts/95cg26LddpU",
    "https://www.youtube.com/shorts/KPMii4Fnewg",
    "https://www.youtube.com/shorts/vucJTevUI-Q",
    "https://www.youtube.com/shorts/YcQfy1uu2MI",
    "https://www.youtube.com/shorts/Ws3aZ-OFQG8",
    "https://www.youtube.com/shorts/rp50wCtt9n8",
    "https://www.youtube.com/shorts/q-CbUtTsZYQ",
    "https://www.youtube.com/shorts/jEI5Rmp5TDo",
    "https://www.youtube.com/shorts/lIc1-rJ-3qA",
    "https://www.youtube.com/shorts/oDeg6uHQkm4",
    "https://www.youtube.com/shorts/KJR-XldQ8RU",
    "https://www.youtube.com/shorts/otX7DoIYVmk",
    "https://www.youtube.com/shorts/UzTPWPiQSs0",
    "https://www.youtube.com/shorts/dD0rb_1XnpQ",
    "https://www.youtube.com/shorts/aM_k7vXkqmY",
    "https://www.youtube.com/shorts/aas9X4SQRN8",
    "https://www.youtube.com/shorts/ZCQvTVx91cY",
    "https://www.youtube.com/shorts/_ObnNnDYDv4",
    "https://www.youtube.com/shorts/0bsZhpxnUJo",
    "https://www.youtube.com/shorts/rLCL6FV1oOA",
    "https://www.youtube.com/shorts/SoKa1fQdBmw",
    "https://www.youtube.com/shorts/DWc7ctA837g",
    "https://www.youtube.com/shorts/TKUD7eodRQg",
    "https://www.youtube.com/shorts/Vxib5l9ifZw",
    "https://www.youtube.com/shorts/syvlkO0B2GU",
    "https://www.youtube.com/shorts/bb_OJDiEiDg",
    "https://www.youtube.com/shorts/RaHFZnaLmok",
    "https://www.youtube.com/shorts/h9pTOvlzl-Q",
    "https://www.youtube.com/shorts/HC6DN3fpt4Q",
    "https://www.youtube.com/shorts/_IavkS96XIE",
    "https://www.youtube.com/shorts/Ojc0Kot-O-U",
    "https://www.youtube.com/shorts/GfuvSmVNAWs",
    "https://www.youtube.com/shorts/AwfY2Xqt6Vg",
    "https://www.youtube.com/shorts/RFQjlLR5tNg",
    "https://www.youtube.com/shorts/3IINIb8q8E8",
    "https://www.youtube.com/shorts/eM5scfWlzwY",
    "https://www.youtube.com/shorts/LV0j3Dc1DK0",
    "https://www.youtube.com/shorts/UWrN3RpvMag",
    "https://www.youtube.com/shorts/5bSGnyVx3m8",
    "https://www.youtube.com/shorts/k4RW7O7WK5Q",
    "https://www.youtube.com/shorts/08d48AXzgMM",
    "https://www.youtube.com/shorts/V-qShl9AWkE",
    "https://www.youtube.com/shorts/PWtcc90WFF4",
    "https://www.youtube.com/shorts/jib8_F5iBTw",
    "https://www.youtube.com/shorts/_NzD7DhERdI",
    "https://www.youtube.com/shorts/ZhkJxB5aL_s",
    "https://www.youtube.com/shorts/iXYvsZV9aBc",
    "https://www.youtube.com/shorts/rzZ5gwA5lEM",
    "https://www.youtube.com/shorts/IqOnHVlzljg",
    "https://www.youtube.com/shorts/iZHb8GVjN1k",
    "https://www.youtube.com/shorts/ahQAlSP_IYY",
    "https://www.youtube.com/shorts/UoqgT0nmWZQ",
    "https://www.youtube.com/shorts/6slDevC4w6g",
    "https://www.youtube.com/shorts/0uwmL4z4xuk",
    "https://www.youtube.com/shorts/cT8J4uQGVCk",
    "https://www.youtube.com/shorts/7THYwvGALAk",
    "https://www.youtube.com/shorts/hoTSzNwrKds",
    "https://www.youtube.com/shorts/hdb1q07iQVQ",
    "https://www.youtube.com/shorts/2NZOv7X2mc8",
    "https://www.youtube.com/shorts/HoIDGDPyBIs",
    "https://www.youtube.com/shorts/zbzUrOlB_do",
    "https://www.youtube.com/shorts/AcBn88Ke8m0",
    "https://www.youtube.com/shorts/vkno-BjhCRc",
    "https://www.youtube.com/shorts/sBntrGyNqSQ",
    "https://www.youtube.com/shorts/9D2B4oLHpk0",
    "https://www.youtube.com/shorts/W-E34PHEDv4",
    "https://www.youtube.com/shorts/XMcqPg8jou0",
    "https://www.youtube.com/shorts/Ik8PbQOc63A",
    "https://www.youtube.com/shorts/P9Oq9gb1SGE",
    "https://www.youtube.com/shorts/5UfhdHZYv6M",
    "https://www.youtube.com/shorts/76n5wfbCP4s",
    "https://www.youtube.com/shorts/-nO-YLnouQg",
    "https://www.youtube.com/shorts/X8rHfcO4hps",
    "https://www.youtube.com/shorts/cyQJhx0u5u0",
    "https://www.youtube.com/shorts/GLOQQm599jI",
    "https://www.youtube.com/shorts/QRwlskL2oeQ",
    "https://www.youtube.com/shorts/A8pYMHaZiI8",
    "https://www.youtube.com/shorts/DF3Q7q0GivY",
    "https://www.youtube.com/shorts/EK545HnoY7A",
    "https://www.youtube.com/shorts/vbUDCYZGUvg",
    "https://www.youtube.com/shorts/ht45ekepwdk",
    "https://www.youtube.com/shorts/Khl0ozhiNhU",
    "https://www.youtube.com/shorts/dKriIc3qZZ0",
    "https://www.youtube.com/shorts/hxLLpuCNweI",
    "https://www.youtube.com/shorts/ltpom-9QMEI",
    "https://www.youtube.com/shorts/ZAzysX4dPag",
    "https://www.youtube.com/shorts/KVBIrupwcy8",
    "https://www.youtube.com/shorts/EEH5YKbFjQQ",
    "https://www.youtube.com/shorts/lMrgAHTajMQ",
    "https://www.youtube.com/shorts/AqKAGAQHKX4",
    "https://www.youtube.com/shorts/OifQSwQ5ztw",
    "https://www.youtube.com/shorts/1TJx7i3boA8",
    "https://www.youtube.com/shorts/AqQX1D9Lb6E",
    "https://www.youtube.com/shorts/FtghdEFvUCA",
    "https://www.youtube.com/shorts/XG5vJcKuPiQ",
    "https://www.youtube.com/shorts/YhQ4ZMbJbYI",
    "https://www.youtube.com/shorts/DRiyyD1X6OM",
    "https://www.youtube.com/shorts/G5Utlh_SZhQ",
    "https://www.youtube.com/shorts/CanWFM_svTc",
    "https://www.youtube.com/watch?v=G1MIBL6T0zY",
    "https://www.youtube.com/shorts/3grs9Y7VnN4",
    "https://www.youtube.com/shorts/AYDMeYgYmYc",
    "https://www.youtube.com/shorts/9iF9P5MPR8k",
    "https://www.youtube.com/shorts/70iF8gr5OH0",
    "https://www.youtube.com/shorts/O9aGrUZl4jQ",
    "https://www.youtube.com/shorts/p7866Mos2kM",
    "https://www.youtube.com/shorts/1TzZl5SqFDQ",
    "https://www.youtube.com/shorts/WnMVjAFCqDo",
    "https://www.youtube.com/shorts/JjwPLVSsC9c",
    "https://www.youtube.com/shorts/PQw9eHoFw6M",
    "https://www.youtube.com/shorts/NSHzt3efNTs",
    "https://www.youtube.com/shorts/V1aA0hqQSCE",
    "https://www.youtube.com/shorts/tnZzRRIWWDA",
    "https://www.youtube.com/shorts/aeKIkd-L1Bo",
    "https://www.youtube.com/shorts/BXMwpvmVWFA",
    "https://www.youtube.com/shorts/oosDwe_QVtg",
    "https://www.youtube.com/shorts/eoAlQ1TtffI",
    "https://www.youtube.com/shorts/Rf6FV-xMKnQ",
    "https://www.youtube.com/shorts/R6Jgb_RA_1s",
    "https://www.youtube.com/shorts/x4ZSjGoumKw",
    "https://www.youtube.com/shorts/9n3JbmizRJc",
    "https://www.youtube.com/shorts/CBwRgG-QEHw",
    "https://www.youtube.com/shorts/9X7mlT1LoNw",
    "https://www.youtube.com/shorts/5sU4KR8SYAA",
    "https://www.youtube.com/shorts/l36N_kJKO7s",
    "https://www.youtube.com/shorts/eCd1RAOE5rw",
    "https://www.youtube.com/shorts/mKASEimHxm0",
    "https://www.youtube.com/shorts/HwA89FChJR8",
    "https://www.youtube.com/shorts/jDka-j_jxy0",
    "https://www.youtube.com/shorts/Yts-6kE0aJ8",
    "https://www.youtube.com/shorts/RHs7KZG60RQ",
    "https://www.youtube.com/shorts/Y_ihC_LV6Z0",
    "https://www.youtube.com/shorts/w1pTWJKpxDA",
    "https://www.youtube.com/shorts/GZQGtfDB_-c",
    "https://www.youtube.com/shorts/gFG2rbzb9nU",
    "https://www.youtube.com/shorts/osXzNcOX8jo",
    "https://www.youtube.com/shorts/-sA4KsqhJ7c",
    "https://www.youtube.com/shorts/8qqawVahIuE",
    "https://www.youtube.com/shorts/M6NhUyWGuvc",
    "https://www.youtube.com/shorts/IPywDzNuDlk",
    "https://www.youtube.com/shorts/J_iSwD-ise8",
    "https://www.youtube.com/shorts/1XrBL4L6QiY",
    "https://www.youtube.com/shorts/B8YiMaPKK8E",
    "https://www.youtube.com/shorts/C8d0bKsjTAo",
    "https://www.youtube.com/shorts/3VprcaqWR5c",
    "https://www.youtube.com/shorts/j2s_a13_png",
    "https://www.youtube.com/shorts/N9zpZC7NNqM",
    "https://www.youtube.com/shorts/mrT1BqJDrzw",
    "https://www.youtube.com/shorts/Hom-masolDY",
    "https://www.youtube.com/shorts/5heO60QJoUw",
    "https://www.youtube.com/shorts/RCAUjcaxIsE",
    "https://www.youtube.com/shorts/J8PQTBtrxIw",
    "https://www.youtube.com/shorts/ZFB8PbJqQ0A",
    "https://www.youtube.com/shorts/kocikhROgpw",
    "https://www.youtube.com/shorts/7s88J2Jqr-k",
    "https://www.youtube.com/shorts/pWTYfwe7x9I",
    "https://www.youtube.com/shorts/Eyb0avfsapg",
    "https://www.youtube.com/shorts/tfSoHecAcqI",
    "https://www.youtube.com/shorts/vfpZ8ceZItY",
    "https://www.youtube.com/shorts/l_0Rtie5ibw",
    "https://www.youtube.com/shorts/Io5MYY0eztg",
    "https://www.youtube.com/shorts/bT0O-h22K_8",
    "https://www.youtube.com/shorts/Yiaw6nlRLWU",
    "https://www.youtube.com/shorts/yExz98gSIB8",
    "https://www.youtube.com/shorts/frg5lXprvnM",
    "https://www.youtube.com/shorts/1Lv701XQQj0",
    "https://www.youtube.com/shorts/_FkIrByDQgE",
    "https://www.youtube.com/shorts/urnRW9e0CWM",
    "https://www.youtube.com/shorts/sZkkNdp1gWo",
    "https://www.youtube.com/shorts/JPDPsEgpHjA",
    "https://www.youtube.com/shorts/lz2pAKz9iM0",
    "https://www.youtube.com/shorts/Udq08UNvc3o",
    "https://www.youtube.com/shorts/sHHMCXN_3r8",
    "https://www.youtube.com/shorts/molY6m0dvRc",
    "https://www.youtube.com/shorts/B9B55V5vmmA",
    "https://www.youtube.com/shorts/YZEyuto7rDs",
    "https://www.youtube.com/shorts/TxAmSTDx7-M",
    "https://www.youtube.com/shorts/r8XBU8Uyw98",
    "https://www.youtube.com/shorts/MUfQ2X53RkA",
    "https://www.youtube.com/shorts/T5hMefBqml4",
    "https://www.youtube.com/shorts/GAOr1ldoVVw",
    "https://www.youtube.com/shorts/mtRheIL-MXc",
    "https://www.youtube.com/shorts/9usQmyox4BQ",
    "https://www.youtube.com/shorts/lVJxnhqnr18"
];

const content: string[][] = [];

for (let i = 0; i < COLUMNS; i++) {
    content.push(JSON.parse(JSON.stringify(shuffle(videos).slice(0, 100))));
}

const videoStyles = {
    normal: {
        height: `100%`,
        width: `100%`,
        backgroundColor: 'red',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        zIndex: 5,
    },
    hoverred: {
        backgroundColor: 'green',
        border: '3px solid white',
    },
    selected: {
        border: '3px solid #00ff00',
    },
}

const Ads: NextPage = () => {
    const [hover, setHover] = useState([-1, -1]);
    const [selected, setSelected] = useState([-1, -1]);
    const [showChild, setShowChild] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        setShowChild(true);

        const id = setInterval(() => {
            let rndmCol = Math.floor(Math.random() * COLUMNS);

            while (rndmCol === selected[0] || rndmCol === hover[0] || COLUMNS < 2) {
                rndmCol = Math.floor(Math.random() * COLUMNS);
            }

            const rndmRow = Math.floor(Math.random() * videos.length * 0.6);
            scrollRandom(rndmCol, rndmRow);
        }, 3000);

        return () => clearInterval(id);
    }, [selected[0]]);

    if (!showChild) {
        return null;
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'row',
        }}>
            {
                content.map((column, columnIndex) => {
                    return <div
                        key={columnIndex}
                        id={createId(columnIndex)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100vh',
                            width: `calc(100vw / ${COLUMNS})`,
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                            scrollSnapType: 'y mandatory',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {column.map((video, videoIndex) =>
                            <div
                                key={videoIndex}
                                id={createId(columnIndex, videoIndex)}
                                style={{
                                    // minHeight: `calc(100vw / ${COLUMNS} * ${16/9})`,
                                    minHeight: `calc(100vw / ${COLUMNS})`,
                                    width: `100%`,
                                    padding: '4px',
                                    scrollSnapAlign: 'start',
                                }}
                            >
                                <div
                                    // className={selected[0] === columnIndex && selected[1] === videoIndex ? styles.border : ''}
                                    style={{
                                        ...videoStyles.normal,
                                        ...(
                                            (selected[0] === columnIndex && selected[1] === videoIndex)
                                                ? videoStyles.selected
                                                : (hover[0] === columnIndex && hover[1] === videoIndex)
                                                    ? videoStyles.hoverred
                                                    : {})
                                    }}
                                    onMouseEnter={() => {
                                        setHover([columnIndex, videoIndex]);
                                    }}
                                    onMouseLeave={() => {
                                        setHover([-1, -1]);
                                    }}
                                    onClick={() => {
                                        setSelected([columnIndex, videoIndex]);
                                        setSelectedVideo(video);
                                        console.log(video);
                                    }}
                                >
                                    <img
                                        width="200%"
                                        height="200%"
                                        style={{
                                            display: 'flex',
                                            objectFit: 'cover',
                                            alignItems: 'center'
                                        }}
                                        src={getYoutubeCover(video)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                })
            }
            {selectedVideo && <div
                style={{
                    position: 'fixed',
                    top: '15vh',
                    height: '70vh',
                    width: `calc(70vh * ${9 / 16})`,
                    backgroundColor: 'black',
                    right: '30vh',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    border: '4px solid white',
                    borderRadius: '16px',
                }}
            >
                <Player videoUrl={selectedVideo} paused={false} />
            </div>}
        </div>
    );
}

export default Ads;

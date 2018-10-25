-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 25 Okt 2018 pada 10.38
-- Versi server: 10.1.36-MariaDB
-- Versi PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_react`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `StudentDetailsTable`
--

CREATE TABLE `StudentDetailsTable` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(30) NOT NULL,
  `student_class` varchar(30) NOT NULL,
  `student_phone_number` varchar(15) NOT NULL,
  `student_email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `StudentDetailsTable`
--

INSERT INTO `StudentDetailsTable` (`student_id`, `student_name`, `student_class`, `student_phone_number`, `student_email`) VALUES
(1, 'john', 'XI', '0829893839', 'dfdfd'),
(2, 'john', 'XI', '0829893839', 'dfdfd');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `StudentDetailsTable`
--
ALTER TABLE `StudentDetailsTable`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `StudentDetailsTable`
--
ALTER TABLE `StudentDetailsTable`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

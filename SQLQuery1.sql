-- Tworzenie bazy danych
CREATE DATABASE ElectronicsPartsShop;

-- Prze³¹czenie na nowo utworzon¹ bazê danych
USE ElectronicsPartsShop;

-- Tworzenie tabeli dla modelu Product
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,  -- Id to klucz g³ówny z autoinkrementacj¹
    Name NVARCHAR(255) NOT NULL,        -- Nazwa produktu (string)
    Description NVARCHAR(500),          -- Opis produktu (string)
    Price DECIMAL(18, 2) NOT NULL,      -- Cena produktu (decimal)
    ImagePath NVARCHAR(255)             -- Œcie¿ka do obrazu (string)
);

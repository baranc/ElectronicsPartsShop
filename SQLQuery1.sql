-- Tworzenie bazy danych
CREATE DATABASE ElectronicsPartsShop;

-- Prze��czenie na nowo utworzon� baz� danych
USE ElectronicsPartsShop;

-- Tworzenie tabeli dla modelu Product
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,  -- Id to klucz g��wny z autoinkrementacj�
    Name NVARCHAR(255) NOT NULL,        -- Nazwa produktu (string)
    Description NVARCHAR(500),          -- Opis produktu (string)
    Price DECIMAL(18, 2) NOT NULL,      -- Cena produktu (decimal)
    ImagePath NVARCHAR(255)             -- �cie�ka do obrazu (string)
);

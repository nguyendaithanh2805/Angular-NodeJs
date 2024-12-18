-- 1. CREATE DATABASE
CREATE DATABASE IF NOT EXISTS db_coffee;
USE db_coffee;
-- 2. CREATE TABLE
CREATE TABLE tbl_category (
    categoryId     	INT             AUTO_INCREMENT,
    name            VARCHAR(100)    NOT NULL,
    CONSTRAINT PK_tbl_category PRIMARY KEY (categoryId)
);

CREATE TABLE tbl_product (
    productId		INT 		    AUTO_INCREMENT,
    categoryId     	INT             NOT NULL,
    name 			VARCHAR(100) 	NOT NULL,
    description     VARCHAR(255)	NOT NULL,
    discount		DECIMAL(10, 2)	NULL,
    image			VARCHAR(50)		NOT NULL,
    quantity 		INT 			NOT NULL,
    sellingPrice	DECIMAL(10, 2)  NOT NULL,
    CONSTRAINT PK_tbl_product PRIMARY KEY (productId)
);

CREATE TABLE tbl_order (
    orderId        	INT             NOT NULL,
    paymentMethod   VARCHAR(255)    NOT NULL,
    userId     		INT             NOT NULL,
    orderDate      	DATE            NOT NULL,
    deliveryDate   	DATE            NOT NULL,
    status          BOOLEAN         NOT NULL ,
    address         VARCHAR(255)    NOT NULL,
    CONSTRAINT PK_tbl_order PRIMARY KEY (orderId)
);

CREATE TABLE tbl_order_detail (
    productId      	INT             NOT NULL,
    orderId        	INT             NOT NULL,
    discount        DECIMAL(10, 2)  NOT NULL,
    quantity   		INT             NOT NULL,
    totalBill	    DECIMAL(10, 2)  NOT NULL,
    CONSTRAINT PK_tbl_order_detail PRIMARY KEY (productId, orderId)
);

CREATE TABLE tbl_cart (
    cartId         	INT             AUTO_INCREMENT,
    userId         	INT             NOT NULL,
    productId      	INT             NOT NULL,
    quantity	   	INT             NOT NULL,
    totalBill	    DECIMAL(10, 2)  NOT NULL,
    CONSTRAINT PK_tbl_cart primary key (cartId)
);

CREATE TABLE tbl_role (
    roleId         	INT             AUTO_INCREMENT,
    name            VARCHAR(50)     NOT NULL,
    CONSTRAINT PK_tbl_role PRIMARY KEY (roleId)
);

CREATE TABLE tbl_user (
    userId       INT               AUTO_INCREMENT,
    roleId       INT               NOT NULL,
    username     VARCHAR(50)       NOT NULL UNIQUE,
    password     VARCHAR(255)      NOT NULL,
    CONSTRAINT PK_tbl_user PRIMARY KEY (userId)
);
-- 3. RELATIONSHIP
---- FOREIGN KEY OF THE 'tbl_product'.
------ The foreign key of the 'tbl_product' references the 'categoryId' column of the 'tbl_category'.
ALTER TABLE tbl_product
    ADD CONSTRAINT FK_tbl_product_tbl_category FOREIGN KEY (categoryId) REFERENCES tbl_category (categoryId);

---- FOREIGN KEY OF THE 'tbl_order_detail'.
------ The foreign key of the 'tbl_order_detail' references the 'orderId' column of the 'tbl_order'.
ALTER TABLE tbl_order_detail
    ADD CONSTRAINT FK_tbl_order_detail_tbl_oder FOREIGN KEY (orderId) REFERENCES tbl_order (orderId);
    
------ The foreign key of the 'tbl_order_detail' references the 'productId' column of the 'tbl_product'.
ALTER TABLE tbl_order_detail
    ADD CONSTRAINT FK_tbl_order_detail_tbl_product FOREIGN KEY (productId) REFERENCES tbl_product (productId);

---- FOREIGN KEY OF THE 'tbl_order'.
------ The foreign key of the 'tbl_order' references the 'userId' column of the 'tbl_user '.
ALTER TABLE tbl_order
	ADD CONSTRAINT FK_order_user FOREIGN KEY (userId) REFERENCES tbl_user (userId);

---- FOREIGN KEY OF THE 'tbl_cart'.
------ The foreign key of the 'tbl_cart' references the 'userId' column of the 'tbl_customer'.
ALTER TABLE tbl_cart
    ADD CONSTRAINT FK_tbl_cart_tbl_user FOREIGN KEY (userId) REFERENCES tbl_user (userId);
------ The foreign key of the 'tbl_cart' references the 'productId' column of the 'tbl_product'.
ALTER TABLE tbl_cart
    ADD CONSTRAINT FK_tbl_cart_tbl_product FOREIGN KEY (productId) REFERENCES tbl_product (productId);

---- FOREIGN KEY OF THE 'tbl_user'.
------ The foreign key of the 'tbl_user' references the 'roleId' column of the 'tbl_role'.
ALTER TABLE tbl_user
    ADD CONSTRAINT FK_tbl_user_tbl_role FOREIGN KEY (roleId) REFERENCES tbl_role(roleId);
    
-- 4. INSERT INTO VIRTUAL DATA
INSERT INTO tbl_role (roleId, name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER');

INSERT INTO tbl_category (name) 
VALUES
('Cà phê'),
('Trà'),
('Sinh tố'),
('Nước ép'),
('Bánh ngọt');

INSERT INTO tbl_product (categoryId, name, description, discount, image, quantity, sellingPrice)
VALUES
(1, 'Cà phê đen', 'Cà phê đen nguyên chất, đậm đà và thơm ngon', 0.10, 'ca-phe-den.jpg', 3, 20000),
(1, 'Cà phê sữa', 'Kết hợp hoàn hảo giữa cà phê đậm và sữa đặc', 0.15, 'ca-phe-sua.jpg', 8, 25000),
(2, 'Trà sữa trân châu', 'Trà sữa ngọt ngào với topping trân châu dai giòn', 0.05, 'tra-sua-tran-chau.jpg', 10, 30000),
(4, 'Nước ép cam', 'Nước ép cam tươi nguyên chất, giàu vitamin C', 0.10, 'nuoc-ep-cam.jpg', 5, 35000),
(5, 'Bánh Tiramisu', 'Bánh Tiramisu hảo hạng với vị béo ngậy của kem phô mai', 0.20, 'banh-tiramisu.jpg', 12, 40000);


INSERT INTO tbl_user (roleId, username, password)
VALUES
(2, 'ThanhNguyen', 'password1'),
(2, 'TuanLe', 'password2'),
(2, 'TrinhPhan', 'password3'),
(2, 'NhiHo', 'password4'),
(2, 'DuTran', 'password5'),
(2, 'HoaVo', 'password6'),
(2, 'MinhNguyen', 'password7'),
(2, 'QuangTran', 'password8'),
(2, 'AnPham', 'password9'),
(2, 'BaoLe', 'password10'),
(2, 'LinhPham', 'password11'),
(2, 'HaVu', 'password12'),
(2, 'NamHoang', 'password13'),
(2, 'PhuongBui', 'password14'),
(2, 'TrangDang', 'password15'),
(2, 'HuyLe', 'password16'),
(2, 'KhanhNguyen', 'password17'),
(2, 'ThaoPham', 'password18'),
(2, 'KienNguyen', 'password19'),
(2, 'DuyTran', 'password20');
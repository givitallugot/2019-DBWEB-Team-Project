-- C:\Program Files\MySQL\MySQL Server 8.0\bin

-- CREATE USER team05;  -- 유저 생성
-- CREATE USER team05@localhost identified by 'team05';  -- 비밀번호 설정

-- CREATE DATABASE team05;   -- 데이터베이스 생성
-- USE team05;
-- ALTER USER 'team05'@localhost identified with mysql_native_password by 'team05';
-- GRANT ALL PRIVILEGES ON *.* TO team05@localhost;  -- 권한 설정
-- FLUSH PRIVILEGES;  -- 권한 베포

-- mysql -uteam05 -p       team05로 mysql 재접속
-- USE team05


--Table structure for table `Test_User`

CREATE TABLE users ( 
    'id'            INT NOT NULL    AUTO_INCREMENT , 
    'Uid'           VARCHAR(50)     NOT NULL ,
    'password'      VARCHAR(255), 
    'displayName'   VARCHAR(50),
    PRIMARY KEY (id), 
    UNIQUE (Uid)
) ENGINE = InnoDB;

-- Table structure for table `Movie_Information`
--
CREATE TABLE Movie_Information
(
    `id`             INT            AUTO_INCREMENT,
    `title`          VARCHAR(100)   NOT NULL,
    `summary`        MEDIUMTEXT     NULL,
    `release_date`   DATE           NULL,
    `genres`         VARCHAR(45)    NULL,
    `runtime`        INT            NULL,
    `revenue`        BIGINT         NULL,
    PRIMARY KEY (id, title),
    INDEX (title)
) ENGINE = InnoDB;

-- Table structure for table `Distributor`
--
CREATE TABLE Movie_Distributor
(
    `id`                INT            NOT NULL    AUTO_INCREMENT,
    `title`             VARCHAR(100)   NOT NULL,
    `distributor`       VARCHAR(45)    NOT NULL,
    `location`          VARCHAR(45)    NULL,
    `foundation_date`   YEAR           NULL,
    `employee_number`   INT            NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

ALTER TABLE Movie_Distributor
    ADD CONSTRAINT FK_Movie_Distributor_title_Movie_Information_title FOREIGN KEY (title)
    REFERENCES Movie_Information (title) ON DELETE CASCADE ON UPDATE CASCADE;


-- Table structure for table `Director`

CREATE TABLE Movie_Director
(
    `id`             INT            NOT NULL    AUTO_INCREMENT,
    `title`          VARCHAR(100)   NOT NULL,
    `director_name`  VARCHAR(45)    NOT NULL,
    `gender`         VARCHAR(45)    NULL,
    `age`            INT            NULL,
    `direct_number`  INT            NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

-- Table structure for table `Director`

ALTER TABLE Movie_Director
    ADD CONSTRAINT FK_Movie_Director_director_name_Movie_Information_title FOREIGN KEY (title)
    REFERENCES Movie_Information (title) ON DELETE CASCADE ON UPDATE CASCADE;

-- Table structure for table `Actor`
--
CREATE TABLE Movie_Actor
(
    `id`          INT           NOT NULL    AUTO_INCREMENT,
    `title`       VARCHAR(100)  NOT NULL,
    `actor_name`  VARCHAR(45)    NOT NULL,
    `gender`      VARCHAR(45)    NULL,
    `age`         INT            NULL,
    `act_number`  INT            NULL,
    PRIMARY KEY (id, actor_name),
    INDEX(actor_name)
) ENGINE = InnoDB;

-- Table structure for table `Actor`

ALTER TABLE Movie_Actor
    ADD CONSTRAINT FK_Movie_Actor_title_Movie_Information_title FOREIGN KEY (title)
    REFERENCES Movie_Information (title) ON DELETE CASCADE ON UPDATE CASCADE;


-- Table structure for table `Review`
--
CREATE TABLE Movie_Review
(
    `id`       INT            NOT NULL     AUTO_INCREMENT,
    `title`    VARCHAR(100)   NOT NULL,
    `points`   FLOAT          NULL,
    `comment`  MEDIUMTEXT     NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

ALTER TABLE Movie_Review
    ADD CONSTRAINT FK_Movie_Review_title_Movie_Information_title FOREIGN KEY (title)
        REFERENCES Movie_Information (title) ON DELETE CASCADE ON UPDATE CASCADE;

-- DELETE FROM users WHERE id=;
-- SET @COUNT = 0; users SET id=@COUNT:=@COUNT+1;


-- Table structure for table `Reputation`
CREATE TABLE Movie_Reputation
(
    `id`            INT            NOT NULL     AUTO_INCREMENT,
    `actor_name`    VARCHAR(45)    NULL,
    `points`        FLOAT          NULL,
    `comment`       MEDIUMTEXT     NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

ALTER TABLE Movie_Reputation
    ADD CONSTRAINT FK_Movie_Reputation_actor_name_Movie_Actor_actor_name FOREIGN KEY (actor_name)
        REFERENCES Movie_Actor (actor_name) ON DELETE CASCADE ON UPDATE CASCADE;

-- DELETE FROM Movie_Review WHERE id=;
-- SET @COUNT = 0; UPDATE Movie_Review SET id=@COUNT:=@COUNT+1;


-- 데이터 LOAD
LOAD DATA INFILE "m_inform.txt"
INTO TABLE Movie_Information IGNORE 1 ROWS;

LOAD DATA INFILE "m_distributor.txt"
INTO TABLE Movie_Distributor IGNORE 1 ROWS;

LOAD DATA INFILE "m_director.txt"
INTO TABLE Movie_Director IGNORE 1 ROWS;

LOAD DATA INFILE "m_actor.txt"
INTO TABLE Movie_Actor IGNORE 1 ROWS;

LOAD DATA INFILE "m_review.txt"
INTO TABLE Movie_Review IGNORE 1 ROWS;

LOAD DATA INFILE "m_reputation.txt"
INTO TABLE Movie_Reputation IGNORE 1 ROWS;

-- LOAD DATA INFILE "m_user.txt"
-- INTO TABLE Test_User IGNORE 1 ROWS;
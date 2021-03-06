-- MySQL Script generated by MySQL Workbench
-- Thu Jul 30 13:37:03 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema deeplab
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema deeplab
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `deeplab` DEFAULT CHARACTER SET utf8 ;
USE `deeplab` ;

-- -----------------------------------------------------
-- Table `deeplab`.`authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`authors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NOT NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `image` VARCHAR(150) NOT NULL,
  `views` INT NOT NULL,
  `created_at` DATE NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_author1_idx` (`author_id` ASC),
  CONSTRAINT `fk_article_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `deeplab`.`authors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`social_networks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`social_networks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `icon` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`article_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`article_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`, `article_id`, `tag_id`),
  INDEX `fk_article_has_tag_tag1_idx` (`tag_id` ASC),
  INDEX `fk_article_has_tag_article1_idx` (`article_id` ASC),
  CONSTRAINT `fk_article_has_tag_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `deeplab`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_has_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `deeplab`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`author_social_networks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`author_social_networks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `social_network_id` INT NOT NULL,
  `author_id` INT NOT NULL,
  `link` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`, `social_network_id`, `author_id`),
  INDEX `fk_social_networks_has_authors_authors1_idx` (`author_id` ASC),
  INDEX `fk_social_networks_has_authors_social_networks1_idx` (`social_network_id` ASC),
  CONSTRAINT `fk_social_networks_has_authors_social_networks1`
    FOREIGN KEY (`social_network_id`)
    REFERENCES `deeplab`.`social_networks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_social_networks_has_authors_authors1`
    FOREIGN KEY (`author_id`)
    REFERENCES `deeplab`.`authors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deeplab`.`days`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deeplab`.`days` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `day` INT NOT NULL,
  `month` INT NOT NULL,
  `year` INT NOT NULL,
  `views` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

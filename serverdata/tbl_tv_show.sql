/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : sijiworld_0715

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2017-12-10 22:23:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_tv_show
-- ----------------------------
DROP TABLE IF EXISTS `tbl_tv_show`;
CREATE TABLE `tbl_tv_show` (
  `pk_global_id` varchar(36) NOT NULL,
  `m_date` date DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_global_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_tv_show
-- ----------------------------
INSERT INTO `tbl_tv_show` VALUES ('11101', '2015-01-01', 'http://198.46.248.122:8888/2015-01-01.mp3');
INSERT INTO `tbl_tv_show` VALUES ('11109', '2015-01-09', 'http://198.46.248.122:8888/2015-01-09.mp3');
INSERT INTO `tbl_tv_show` VALUES ('11112', '2015-01-12', 'http://198.46.248.122:8888/2015-01-12.mp3');
INSERT INTO `tbl_tv_show` VALUES ('11113', '2015-01-13', 'http://198.46.248.122:8888/2015-01-13.mp3');
INSERT INTO `tbl_tv_show` VALUES ('11114', '2015-01-14', 'http://198.46.248.122:8888/2015-01-14.mp3');
INSERT INTO `tbl_tv_show` VALUES ('11115', '2015-01-15', 'http://198.46.248.122:8888/2015-01-15.mp3');

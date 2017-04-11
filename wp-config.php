<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'prosunday');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '#sArM#lp?;@I9<@:VYPfq@~(oRO>x{Sk$?t<}(^Vh6oq}<+B+.0BCJ0k~YDlvYXP');
define('SECURE_AUTH_KEY',  'bJvza`7`t%9 |}_kEjcLg9G=f@UU!_yUmUBi%Q|!E_=11IZnFqzAwX~cMFq(2l{~');
define('LOGGED_IN_KEY',    '?hy8Sgy;0M-?!!mi6s|1$d8/{OI<j,%|q;5z=y%8L-@A0U)^R~Rp5.<J@svgz<5+');
define('NONCE_KEY',        'ZW*C.aO$&ID$EUw;E92`Y}b#Y]s/6Y9S!?pPTl8mV`&HmVlxvY 8Ri6Ay[_Z~/cy');
define('AUTH_SALT',        'MQu}.TRd&KT6+c0RV`_8kw5c7[vuuTKej#qlJ&p*)Ey):6/$DWBKd,fBRyyR4K$[');
define('SECURE_AUTH_SALT', 'cTQ;C.ip=y&losX7~]Q|-.$&KX.{7(x!YhQVS4dh>-&cW?>XAN:|d[Ir7L8*2.k-');
define('LOGGED_IN_SALT',   'dy:t -JVb6Y5Xcoz`4md/pbT}jMtl|IzH@9+3hn5w<}-sU?[e&t##eCz_|(E!!`!');
define('NONCE_SALT',       '.zYw~I}MA%d4nu0U*>lH`6HR)+_O.}zaCt2e B%6ieN-@wj<F]-8lD<7%d0&8YK|');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

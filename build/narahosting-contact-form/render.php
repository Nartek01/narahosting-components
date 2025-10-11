<?php
// render.php
$email_to = get_field('emailTo');  // Or use get_option() if you're saving options to the database
$smtp_server = get_field('smtpServer');

echo '<div class="wp-smtp-block">';
echo '<h3>WP SMTP Mail Settings</h3>';
echo '<p>Email to: ' . esc_html($email_to) . '</p>';
echo '<p>SMTP Server: ' . esc_html($smtp_server) . '</p>';
echo '</div>';
?>

<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "landing-fashion".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'landing-fashion'),

    'flavors' => array (
  'landing-fashion' => 
  array (
    'label' => 'KAINARA — Fashion',
    'brand_name' => 'KAINARA',
    'brand_tagline' => 'Fashion pilihan Indonesia',
    'brand_initials' => 'KN',
    'accent' => '#be185d',
    'category' => 'kreatif',
    'home' => 'landings.fashion',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Menu',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Landing',
              'to' => '/landings/fashion',
              'icon' => 'Home',
            ),
            1 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dashboard',
              'icon' => 'LayoutDashboard',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
          ),
        ),
      ),
    ),
  ),
),
];

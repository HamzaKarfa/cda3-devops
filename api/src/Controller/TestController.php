<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class TestController  extends AbstractController
{
    public function __construct()
    {
        
    }
    public function __invoke()
    {
        dd($this->getParameter('app_env'));
    }
}
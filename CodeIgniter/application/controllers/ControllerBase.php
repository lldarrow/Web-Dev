<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ControllerBase extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('cpts483');
    }

    protected function renderView($viewNames = array(), $data = array(), $scripts = array(), $styles = array())
    {
        $combined = array_merge(
                array('body' => $viewNames, 'scripts' => $scripts, 'styles' => $styles),
                $data
        );
        $this->load->view('_layout', $combined);
    }
}
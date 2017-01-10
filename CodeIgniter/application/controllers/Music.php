<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use cpts483\models as Models;
require_once 'ControllerBase.php';
/*
 * 1. Implement search() inside Music controller
 *      * Create instance of our ChinookRepository
 *      * call search method
 *      * send results to a new view (to be created by you)
 * 2. Implement the search view
 *      * takes the data provided by the controller and uses
 *        a foreach loop to display the results
 */

class Music extends ControllerBase
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('cpts483');
    }

    public function search($title)
    {
        $repository = new Models\ChinookRepository();
        $data = $repository->search_songs_by_title($title);
        $this->renderView(array('music/search'), array('songs' => $data));
    }

    public function edit($id)
    {
        $repository = new Models\ChinookRepository();
        song = $repository->get_song($id);
        rint_r($song);
    }
}

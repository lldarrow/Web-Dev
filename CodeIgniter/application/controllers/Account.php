<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use cpts483\models as Models;

class Account extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('cpts483');
    }

    public function index($name = "")
    {

        redirect('/account/login');
    }

    public function processLogin()
    {
        //we can still access $_POST directly, but
        //we will play by the CI rules instead

        //did we receive a postback?
        if($this->input->get_post(NULL, TRUE))
        {
            $user_name = $this->input->get_post('user_name');
            $password = $this->input->get_post('password');

            //TODO: validate data
            $user = new Models\User();
            $user->Name = $user_name;
            $user->Password = $password;

            //do we have a valid user?
            $repository = new Models\BasicUserRepository();
            if($repository->validate($user) == true)
            {
                //store user credentials using session
                $this->session->user = $user;

                //redirect to super secret page
                redirect('/home');
            }
            else
            {
                $data = array(
                    'errors' => 'Invalid user name or password.'
                );
                $this->load->view('account/login.php', $data);
            }
        }
    }

    public  function login()
    {
        $this->load->view('account/login');
    }
}
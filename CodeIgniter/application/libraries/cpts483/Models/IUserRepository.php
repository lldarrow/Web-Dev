<?php
/**
 * Created by PhpStorm.
 * User: Adam
 * Date: 2/12/2016
 * Time: 7:38 AM
 */
namespace cpts483\models;


interface IUserRepository
{
    public function validate($user);
}
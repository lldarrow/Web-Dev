<?php
/**
 * Created by PhpStorm.
 * User: me
 * Date: 2/19/2016
 * Time: 2:38 PM
 */

namespace cpts483\models;


class BasicUserRepository implements IUserRepository
{

    /***
     * @param User $user
     * @return mixed
     */
    public function validate($user)
    {
        return false;
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Adam
 * Date: 2/12/2016
 * Time: 7:39 AM
 */

namespace cpts483\models;


class UserRepository implements IUserRepository
{
    /**
     * @desc Validates the supplied User object
     * @param $user - User object
     * @return bool
     */
    public function validate($user)
    {
        return true;
    }
}
<?php

namespace cpts483\models;
use \PDO;

class ChinookRepository
{
    private $_db;

    public function __construct()
    {
        $db_file = 'sqlite:' . dirname(__FILE__) . '/Chinook_Sqlite.sqlite';
        $this->_db = new PDO($db_file);
        $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /***
     * @desc Returns an array of objects based on supplied query and params
     * @param string $query
     * @param array $params
     * @return array
     */
    private function pdo_query($query, $params)
    {
        $statement = $this->_db->prepare($query);
        $statement->execute($params);
        $statement->setFetchMode(PDO::FETCH_OBJ);

        //put data into an array
        $data = array();
        while($row = $statement->fetch())
        {
            $data[] = $row;
        }
        return $data;
    }

    /***
     * @desc Executes a scalar query (no result) against our DB.
     * @param string $query
     * @param array $params
     * @return null
     */
    private function pdo_scalar($query, $params)
    {
        $statement = $this->_db->prepare($query);
        $statement->execute($params);
    }

    /***
     * @desc Searches the repository of songs by title.
     * @param string $title
     * @return object[]
     */
    public function search_songs_by_title($title)
    {
        $params = (array('title' => '%' . $title . '%'));
        $sql = "SELECT * FROM Track WHERE Name LIKE :title";
        return $this->pdo_query($sql, $params);
    }

    /**
     * @desc Fetches the song with the supplied id
     * @param int $id
     * @return Track
     */
    public function get_song($id)
    {
        $params = array('id' => $id);
        $sql = "SELECT * FROM Track WHERE TrackId = :id";
        return $this->pdo_query($sql, $params)[0];
    }

    public function update song
    {
        $sql = "UPDATE track "."SET Name = :name, Composer = :composer" . "WHERE TrackId = :id";
        $params = array('id' => Track->TrackId,
                        'name' => $track->Name,
                        'composer' => $track->Composer
        );
        $this->pdo_scalar($sql, $params);
    }
}

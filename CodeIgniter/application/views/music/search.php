<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>AlbumId</th>
        <th>Composer</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach($songs as $song): ?>
        <tr>
            <td><?= $song->Name; ?></td>
            <td><?= $song->AlbumId; ?></td>
            <td><?= $song->Composer; ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
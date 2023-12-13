<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class BackupDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup the MySQL database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $backupPath = storage_path('backups');
        $filename = 'backup_' . now()->format('Y-m-d_H-i-s') . '.sql';
        $path = $backupPath . '/' . $filename;

        // Перевірка і створення каталогу, якщо його не існує
        if (!File::exists($backupPath)) {
            File::makeDirectory($backupPath, 0755, true);
        }

        $command = sprintf(
            'mysqldump -u%s -p%s %s > %s',
            config('database.connections.mysql.username'),
            config('database.connections.mysql.password'),
            config('database.connections.mysql.database'),
            $path
        );

        exec($command);

        $this->info('Backup completed successfully.');
    }
}

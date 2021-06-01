<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;

/**
 * m210531_194937_cellar migration.
 */
class m210531_194937_cellar extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
      $this->createTable('moet_cellar_items', [
        'id' => $this->primaryKey(),
        'user_id' => $this->integer()->notNull(),
        'product_id' => $this->integer()->notNull(),
        'request_purchase' => $this->boolean()->notNull()->defaultValue(false),
        'created_at' => $this->dateTime()->notNull(),
        'updated_at' => $this->dateTime()->notNull(),
        'dateUpdated' => $this->dateTime()->notNull()
      ]);

      $this->createIndex(
        'moet_cellar_items_user_product_idx',
        'moet_cellar_items',
        ['user_id', 'product_id'],
        true
      );
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
      $this->dropTable('moet_cellar_items');
    }
}

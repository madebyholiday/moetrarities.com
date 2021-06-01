<?php

namespace moet\models;

use \yii\db\ActiveRecord;

class CellarItem extends ActiveRecord
{    
    public static function tableName()
    {
        return 'moet_cellar_items';
    }

    public function beforeSave ( $insert )
    {
        if ( $insert ) {
            $this->created_at = date('Y-m-d H:i:s');
        }

        $this->updated_at = date('Y-m-d H:i:s');
        $this->dateUpdated = date('Y-m-d H:i:s');

        return true;
    }
}




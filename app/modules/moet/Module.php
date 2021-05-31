<?php
namespace moet;

use Craft;

class Module extends \yii\base\Module
{
  public function init()
  {        
    /* if ( Craft::$app->getRequest()->getPathInfo() === 'fuck' ) {

     * } else {
     *   Craft::$app->getResponse()->redirect('/fuck')->send();
     *   die();
     * }*/
    
    parent::init();

    // Custom initialization code goes here...
  }
}

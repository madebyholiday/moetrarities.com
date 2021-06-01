<?php
namespace moet;

use Craft;
use craft\web\twig\variables\CraftVariable;
use yii\base\Event;
use moet\services\Cellar;

class Module extends \yii\base\Module
{
  public function init()
  {        
    parent::init();

    Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function(Event $e) {
      /** @var CraftVariable $variable */
      $variable = $e->sender;
           
      $variable->set('cellar', Cellar::class);
    });
    
    $this->setComponents([
        'cellar' => \moet\services\Cellar::class,
    ]);
  }
}

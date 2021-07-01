<?php
namespace moet;

use Craft;
use craft\web\twig\variables\CraftVariable;
use yii\base\Event;
use craft\events\RegisterComponentTypesEvent;
use craft\services\Dashboard;

use moet\services\Cellar;

class Module extends \yii\base\Module
{
  public function init()
  {        
    parent::init();

    Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function(Event $e) {
      $variable = $e->sender;
      
      $variable->set('cellar', Cellar::class);
    });

    /* Event::on(
     *   Dashboard::class,
     *   Dashboard::EVENT_REGISTER_WIDGET_TYPES,
     *   function(RegisterComponentTypesEvent $event) {
     *     $event->types[] = MyWidget::class;
     *   }
     * );*/
    
    $this->setComponents([
      'cellar' => \moet\services\Cellar::class,
    ]);
  }
}

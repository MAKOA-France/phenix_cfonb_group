<?php

namespace Drupal\phenix_cfonb_group\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class CustomConfigForm.
 */
class CustomConfigForm extends ConfigFormBase {

    

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['phenix_cfonb_group.form.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'phenix_cfonb_group_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('phenix_cfonb_group.form.settings');
    $form = parent::buildForm($form, $form_state);
    $form['#cache'] = [
        'max-age' => 0,
        'contexts' => [],
        'tags' => [],
      ];


      // dump($defaultMail['value']);
      $form['text_subject'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Objet'),
      //   '#description' => $this->t('Entrer le lien'),
        '#default_value' => $config->get('text_subject'),
      ];
      //   dump($config->get('custom_lien_mailing'));
    $form['text_mail'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Contenu du mail'),
      '#format' => 'full_html', // Load the saved format
      '#allowed_formats' => ['full_html'], // Specify allowed formats
    //   '#description' => $this->t('Entrer le lien'),
      '#default_value' => $config->get('text_mail')['value'],
    ];
    
    return $form;
  }


  

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('phenix_cfonb_group.form.settings')
      ->set('text_mail', $form_state->getValue('text_mail'))
      ->set('text_subject', $form_state->getValue('text_subject'))
      ->save();
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    // Disable cache tags by returning an empty array.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    // Disable cache contexts by returning an empty array.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    // Disable caching by setting the max age to 0.
    return 0;
  }

}

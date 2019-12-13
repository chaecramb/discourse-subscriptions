import Route from "@ember/routing/route";
import UserSubscription from "discourse/plugins/discourse-subscriptions/discourse/models/user-subscription";

export default Route.extend({
  model() {
    return UserSubscription.findAll();
  },

  setupController(controller, model) {
    if (this.currentUser.id !== this.modelFor("user").id) {
      this.replaceWith("userActivity");
    } else {
      controller.setProperties({ model });
    }
  },

  actions: {
    cancelSubscription(subscription) {
      bootbox.confirm(
        I18n.t(
          "discourse_subscriptions.user.subscriptions.operations.destroy.confirm"
        ),
        I18n.t("no_value"),
        I18n.t("yes_value"),
        confirmed => {
          if (confirmed) {
            subscription.set("loading", true);

            subscription
              .destroy()
              .then(result => subscription.set("status", result.status))
              .catch(data =>
                bootbox.alert(data.jqXHR.responseJSON.errors.join("\n"))
              )
              .finally(() => {
                subscription.set("loading", false);
              });
          }
        }
      );
    }
  }
});

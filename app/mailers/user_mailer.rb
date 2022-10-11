class UserMailer < ApplicationMailer
    def notify_user(email)
        @user = email
        mail(to: @user,subject: "heeeyy")
    end
end

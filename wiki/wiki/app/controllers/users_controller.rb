class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @articles = @user.articles
  end

  # GET /users/new
  def new
    @user = User.new
  end

  def edit
  end

  def create
      if session[:user_id]
        redirect_to root_path
      else
        user_params = params.require(:user).permit(:first_name, :last_name, :email, :password)
        @user = User.new(user_params)
        if @user.valid?
          @user.save
          session[:user_id] = @user.id
          redirect_to root_path
        else
          render :new
        end
      end
    end


  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def login
    if current_user
      redirect_to '/articles'
    else
      render :login
    end
  end

  def logout
    session[:user_id]=nil
    redirect_to '/login'
  end

  def login_post
    @user = User.find_by({email: params[:email]})
    if @user
      if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to '/articles'
      else
        redirect_to '/login'
      end
    else
    redirect_to '/login'
  end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :tag)
    end
end

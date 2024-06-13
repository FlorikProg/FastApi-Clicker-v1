from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

def add_click(username):
    path = "C:/Users/playv/OneDrive/Рабочий стол/best_clicker_lox_coin/backend/src/users.db"

    # Create a connection to the database
    engine = create_engine(f'sqlite:///{path}')

    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    # Define the Base class
    Base = declarative_base()


    class User(Base):
        __tablename__ = "users"

        id = Column(Integer, primary_key=True, index=True)
        username = Column(String, unique=True, index=True)
        password = Column(String)
        click = Column(Integer)
    # Get the user
    user = session.query(User).filter_by(username=username).first()

    # Increment the click value
    if user:
        user.click += 1
        session.commit()

    # Close the session
    session.close()

